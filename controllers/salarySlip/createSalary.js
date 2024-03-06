const schemas = require("../../mongodb/schemas/schemas");
const pdf = require("html-pdf");
const fs = require("fs");
const ejs = require("ejs");
const { promisify } = require("util");

const writeFileAsync = promisify(fs.writeFile);


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
      const ejsTemplate = SalarySlip.ejs

        const htmlContent = await ejs.render(ejsTemplate, {
            salary: salary,
            employee:employee,
            deductionPerLeave:deductionPerLeave,
            additionPerLeave:additionPerLeave,
        });
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

// Correctly defining the options including childProcessOptions
const options = {
    format: 'A3', // Example: Specify your desired format
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
