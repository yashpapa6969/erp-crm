const schemas = require("../../mongodb/schemas/schemas");
const pdf = require("html-pdf");
const fs = require("fs");
const ejs = require("ejs");
const { promisify } = require("util");
const path = require('path');
const writeFileAsync = promisify(fs.writeFile);
const sendEmail = require("../../middleware/mailingService")


const createSalarySlip = async (req, res) => {
    try {
        let {
            employee_id,
            basicPay,
            travelPay,
            bonus,
            paidLeave,
            tds,
            totalLeaves,
            advanceSalary,
        } = req.body;

        basicPay = Number(basicPay);
        travelPay = Number(travelPay);
        bonus = Number(bonus);
        totalLeaves = Number(totalLeaves);
        tds = Number(tds);
        advanceSalary = Number(advanceSalary);
        const additionPerLeave = (basicPay / 30) * paidLeave;
      
        const totalIncome = basicPay + travelPay + bonus + additionPerLeave;

        const deductionPerLeave = (basicPay / 30) * totalLeaves;
        const totalDeductions = deductionPerLeave + tds + advanceSalary;

        const netSalary = totalIncome - totalDeductions;
        const employee = await schemas.Employee.findOne({ employee_id: employee_id });
        const salary = new schemas.salarySlip({
            employee_id,
            basicPay,
            travelPay,
            bonus,
            paidLeave,
            tds,
            totalLeaves,
            advanceSalary,
            totalIncome,
            totalDeductions,
            netSalary,
        });

        await salary.save();
    
      //  const ejsTemplate = `  `
     // Assuming 'SalarySlip.ejs' is located in a 'templates' directory at the root of your project
const ejsTemplatePath = path.join(__dirname, 'SalarySlip.ejs');

// Read the template content synchronously; for asynchronous reading, use fs.readFile() with await
const ejsTemplate = fs.readFileSync(ejsTemplatePath, 'utf-8');

// Now you have the template content in ejsTemplate, you can render it
const htmlContent = await ejs.render(ejsTemplate, {
    salary: salary,
    employee: employee,
    deductionPerLeave: deductionPerLeave,
    additionPerLeave: additionPerLeave,
});

        const pdfBuffer = await generatePdf(htmlContent);

        // Respond with the generated PDF
        res.set({
            "Content-Disposition": 'attachment; filename="salary_slip.pdf"',
            "Content-Type": "application/pdf",
        });

const emailSubject = `Your Monthly Salary Slip - [Your Company Name]`;
const emailHtmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Salary Slip Notification</title>
<style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; background-color: #f4f4f4; }
    .container { background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
    h1 { color: #007bff; }
    p { line-height: 1.6; }
</style>
</head>
<body>
<div class="container">
    <h1>Dear ${employee.name},</h1>
    <p>We are pleased to inform you that your salary for this month has been processed. Here is the summary:</p>
    <ul>
        <li>Basic Pay: ₹${basicPay}</li>
        <li>Travel Allowance: ₹${travelPay}</li>
        <li>Bonus: ₹${bonus}</li>
        <li>Total Deductions: ₹${totalDeductions}</li>
        <li><strong>Net Salary: ₹${netSalary}</strong></li>
    </ul>
    <p>Please find attached your detailed salary slip for this month.</p>
    <p>If you have any questions regarding your salary slip, feel free to reach out to our HR department.</p>
    <p>Best Regards,<br>[Your Company Name] Team</p>
</div>
</body>
</html>
`;

await sendEmail(employee.email, emailSubject, "", emailHtmlContent);
res.status(200).send(pdfBuffer);

// Then respond with the PDF or any confirmation message

    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ error: "Error generating PDF" });
    }
};

// Correctly defining the options including childProcessOptions
const options = {
    format: 'A1', // Example: Specify your desired format
    orientation: 'portrait', // or 'landscape'
    border: '10mm',
    childProcessOptions: {
        env: {
            OPENSSL_CONF: '/dev/null',
        },
    },
    // You can add other options as needed
};

function generatePdf(htmlContent) {
    return new Promise((resolve, reject) => {
        // Note how the options object is passed here correctly
        pdf.create(htmlContent, options).toBuffer((err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer);
            }
        });
    });
}

module.exports = createSalarySlip;
