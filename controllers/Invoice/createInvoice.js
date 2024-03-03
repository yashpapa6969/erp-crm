const schemas = require("../../mongodb/schemas/schemas");
const pdf = require("html-pdf");
const fs = require("fs");
const ejs = require("ejs");
const { promisify } = require("util");
        const ejs = require("ejs");

const writeFileAsync = promisify(fs.writeFile);
const createInvoice = async (req, res) => {
    try {
        let {
            client_id,
            services,
            gst,
        } = req.body;

        const client = await schemas.Client.findOne({ client_id: client_id });
        const invoice = new schemas.Invoice({
            client_id,
            services:{
                product:services.product, 
                serviceDescription: services.serviceDescription,
                duration: services.duration,
                quantity: services.quantity,
                unitPrice: services.unitPrice,
                startDate:services.startDate,
                endDate: services.endDate,
            },
            gst,
         
        });

       const invoices =  await invoice.save();


const invoiceTemplate = `invoice_template.ejs`; 

const htmlContent = await ejs.render(invoiceTemplate, {
    client: client,
    services: services, 
    invoiceNumber: invoices.invoice_id, 
    dueDate: "MM/DD/YYYY", 
    total: services.unitPrice * services.quantity + gst 
});
        
        // Generate PDF from HTML content
        const pdfBuffer = await generatePdf(htmlContent);

        // Respond with the generated PDF
        res.set({
            "Content-Disposition": 'attachment; filename="salary_slip.pdf"',
            "Content-Type": "application/pdf",
        });
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


