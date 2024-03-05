const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const invoiceSchema = new mongoose.Schema({
    invoive_id: { type: String, default: uuidv4 ,  index: true },
    client_id: { type: String, required: true,   index: true },
    services:[{

        product: {
            type: String,
            required: true, 
        },
        serviceDescription: String,
        duration: String,
        quantity: Number,
        unitPrice: Number,
        startDate:String,
        endDate:String,
    },
],
    subtotal:{ type: Number, required: false, },
    gst:{ type: Number, required: false, },
    total:{ type: Number, required: false, },
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
    



});

const Invoice = mongoose.model('invoice', invoiceSchema);

module.exports = Invoice ;
