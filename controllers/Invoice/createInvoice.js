const schemas = require("../../mongodb/schemas/schemas");
const pdf = require("html-pdf");
const fs = require("fs");
const ejs = require("ejs");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);
const path = require('path');
const sendEmail = require("../../middleware/mailingService")

const createInvoice = async (req, res) => {
    try {
        let {
            client_id,
            services,
            gst,
        } = req.body;

        const client = await schemas.Client.findOne({ client_id: client_id });
        console.log(client)
        const invoice = new schemas.Invoice({
            client_id,
            services,
            gst,
         
        });

       const invoices =  await invoice.save();


       const ejsTemplatePath = path.join(__dirname, 'invoice_template.ejs');

       // Read the template content synchronously; for asynchronous reading, use fs.readFile() with await
       const ejsTemplate = fs.readFileSync(ejsTemplatePath, 'utf-8');
       

const htmlContent = await ejs.render(ejsTemplate, {
    client: client,
    services: services,
    invoiceNumber: invoices.invoice_id,
    dueDate: "MM/DD/YYYY",
    total: services.reduce((acc, service) => acc + (service.unitPrice * service.quantity), 0) + gst
});

     
        // Generate PDF from HTML content
        const pdfBuffer = await generatePdf(htmlContent);

        // Respond with the generated PDF
        res.set({
            "Content-Disposition": 'attachment; filename="invoice_slip.pdf"',
            "Content-Type": "application/pdf",
        });
        const emailSubject = `Invoice Created `;
        const emailHtmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Task Notification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background-color: #f4f4f4;
                }
                .container {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #666;
                }
                .task-detail {
                    margin-top: 20px;
                }
                .task-detail dt {
                    font-weight: bold;
                }
                .task-detail dd {
                    margin: 0 0 10px 0;
                    color: #333;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Invoice Notification</h1>
                <p>You have a new Invoice update:</p>
                <dl class="task-detail">
               
                </dl>
                <p>Please check your  dashboard for more details.</p>
            </div>
        </body>
        </html>
        
        `;
        
        await sendEmail(client.email1, emailSubject, "", emailHtmlContent);
        res.status(200).send(pdfBuffer);

    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ error: "Error generating PDF" });
    }
};

// Function to generate PDF from HTML content
function generatePdf(htmlContent) {
    return new Promise((resolve, reject) => {
        pdf.create(htmlContent,{childProcessOptions: {
            env: {
              OPENSSL_CONF: '/dev/null',
            },
          }
        }).toBuffer((err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer);
            }
        });
    });
}

module.exports = createInvoice;


