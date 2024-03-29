const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const salarySlipSchema = new mongoose.Schema({
    slip_id: { type: String, default: uuidv4,        index: true     },
    employee_id: { type: String, required: true,        index: true 
    },
    basicPay: { type: String, required: true, },
    travelPay: { type: String, required: true, },
    name: { type: String, required: false, },
    bonus: { type: String, required: true, },
    paidLeave: { type: String, required: true, },
    totalIncome: { type: String, required: false, },


    tds: { type: String, required: true, },
    totalLeaves: { type: String, required: true, },
    advanceSalary: { type: String, required: true, },
    totalDeductions: { type: String, required: false, },
    netSalary: { type: String, required: false, },

    date1: {
        type: String,
        default: function () {
          const currentDate = new Date();
          const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
          const istDate = new Date(currentDate.getTime() + istOffset);
          const year = istDate.getFullYear();
          const month = (istDate.getMonth() + 1).toString().padStart(2, "0"); // Zero-padded
          const day = istDate.getDate().toString().padStart(2, "0"); // Zero-padded
          return `${year}-${month}-${day}`;
        },
        unique: false,
      },
      createdAt: { type: Date, default: Date.now }, // Added createdAt field

      time1: {
        type: String,
        default: function () {
          const currentDate = new Date();
          const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
          const istTime = new Date(currentDate.getTime() + istOffset);
          const hours = istTime.getUTCHours().toString().padStart(2, "0"); // Zero-padded
          const minutes = istTime.getUTCMinutes().toString().padStart(2, "0"); // Zero-padded
          const seconds = istTime.getUTCSeconds().toString().padStart(2, "0"); // Zero-padded
          return `${hours}:${minutes}:${seconds}`;
        },
        unique: false,
      },
    
});

const salarySlip = mongoose.model('salarySlip', salarySlipSchema);

module.exports = salarySlip;
