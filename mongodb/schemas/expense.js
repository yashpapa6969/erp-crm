const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const expenseSchema = new mongoose.Schema({

    expense_id: { type: String, default: uuidv4 ,  index: true },
    amountReceived: { type: Number, default: 0 }, // The total amount given to the employee
    categories: [{supplyTagName: {
        type: String,
        required: true
    },
}
], // Array of expense categories
    totalSpent: { type: Number, default: 0 }, 

description: {
  type: String,
  required: true
},

    date1: {
        type: String,
        default: function () {
          const currentDate = new Date();
          const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
          const istDate = new Date(currentDate.getTime() + istOffset);
          const year = istDate.getFullYear();
          const month = (istDate.getMonth() + 1).toString().padStart(2, "0"); // Zero-padded
          const day = istDate.getDate().toString().padStart(2, "0"); // Zero-padded
          return `${day}-${month}-${year}`;
        },
        unique: false,
      },
    
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
    
      createdAt: { type: Date, default: Date.now }, 




});

const Expense = mongoose.model('expense', expenseSchema);

module.exports = Expense ;
