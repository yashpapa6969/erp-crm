const schemas = require("../../mongodb/schemas/schemas");
const pdf = require("html-pdf");
const fs = require("fs");
const ejs = require("ejs");
const { promisify } = require("util");
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
            services,
            gst,
         
        });

       const invoices =  await invoice.save();


const ejsTemplate = `
<!DOCTYPE html>
<html>
<head>
    <title>Invoice</title>
    <style>
        body { font-family: Arial, sans-serif; }
        /* Your CSS styles */
    </style>
</head>
<body>
    <div class="invoice-box">
        <!-- Invoice content -->
            <tr class="heading">
                <td>Item</td>
                <td>Price</td>
            </tr>
            
            <% services.forEach(function(service) { %>
                <tr class="item">
                    <td><%= service.product %>, <%= service.serviceDescription %></td>
                    <td>$<%= service.unitPrice.toFixed(2) %></td>
                </tr>
            <% }); %>
            
            <tr class="total">
                <td></td>
                <td>Total: $<%= total.toFixed(2) %></td>
            </tr>
        </table>
    </div>
</body>
</html>
`;

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


