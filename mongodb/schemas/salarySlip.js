const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const salarySlipSchema = new mongoose.Schema({
    slip_id: { type: String, default: uuidv4 },
    employee_id: { type: String, required: true, },
    basicPay: { type: String, required: true, },
    travelPay: { type: String, required: true, },
    bonus: { type: String, required: true, },
    paidLeave: { type: String, required: true, },
    totalIncome: { type: String, required: false, },


    tds: { type: String, required: true, },
    totalLeaves: { type: String, required: true, },
    advanceSalary: { type: String, required: true, },
    totalDeductions: { type: String, required: false, },
    netSalary: { type: String, required: false, },
});

const salarySlip = mongoose.model('salarySlip', salarySlipSchema);

module.exports = salarySlip;
