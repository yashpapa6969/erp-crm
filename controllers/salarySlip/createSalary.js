const schemas = require("../../mongodb/schemas/salarySlip")
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
        const additionPerLeave = basicPay / 30 * paidLeave;

        const totalIncome = basicPay + travelPay + bonus+additionPerLeave;


        const deductionPerLeave = basicPay / 30 * totalLeaves;
        const totalDeductions = deductionPerLeave + tds + advanceSalary;

        // Calculate net salary
        const netSalary = totalIncome - totalDeductions;

        const newSalarySlip = new schemas.salarySlip({
            employee_id,
            basicPay: basicPay.toString(),
            travelPay: travelPay.toString(),
            bonus: bonus.toString(),
            paidLeave: paidLeave,
            totalIncome: totalIncome.toString(),
            tds: tds.toString(),
            totalLeaves: totalLeaves.toString(),
            advanceSalary: advanceSalary.toString(),
            totalDeductions: totalDeductions.toString(),
            netSalary: netSalary.toString(),
        });

        await newSalarySlip.save();
        res.status(201).json(newSalarySlip);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports = createSalarySlip;
