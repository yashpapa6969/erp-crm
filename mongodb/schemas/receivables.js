const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const receivableSchema = new mongoose.Schema({
    rec_id: { type: String, default: uuidv4,index: true },
    client_id: {
        type: String,
        required: false
    },
    brandName: {
        type: String,
        required: true,
        unique:true,
    },
   
    clientName: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
  totalAmount: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  balanceDue: {
    type: Number,
    required: true
  },
  createdAt: { type: Date, default: Date.now }, // Added createdAt field

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
   
}, {
  timestamps: true 
});

const Receivable = mongoose.model('Receivable', receivableSchema);

module.exports = Receivable;
