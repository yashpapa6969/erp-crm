const schemas = require("../../mongodb/schemas/schemas");
const pdf = require("html-pdf");
const fs = require("fs");
const ejs = require("ejs");
const { promisify } = require("util");
const path = require('path');

const writeFileAsync = promisify(fs.writeFile);


const downloadSalarySlip = async (req, res) => {
    try {

        const { slip_id } = req.params; 

        const slips = await schemas.salarySlip.findOne({slip_id:slip_id});
        console.log(slips)

        const employee = await schemas.Employee.findOne({ employee_id: slips.employee_id });

        
        const ejsTemplatePath = path.join(__dirname, 'SalarySlip.ejs');

        // Read the template content synchronously; for asynchronous reading, use fs.readFile() with await
        const ejsTemplate = fs.readFileSync(ejsTemplatePath, 'utf-8');
        
        // Generate PDF from HTML content
        const pdfBuffer = await generatePdf(ejsTemplate);

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

module.exports = downloadSalarySlip;
