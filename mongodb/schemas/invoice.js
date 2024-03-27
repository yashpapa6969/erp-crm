const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const collectionHistorySchema = new mongoose.Schema({
  amountCollected: { type: Number, required: true },
  collectedOn: { type: Date, default: Date.now }
}, { _id: false }); // _id: false to prevent MongoDB from automatically adding an _id field to sub-documents

const invoiceSchema = new mongoose.Schema({
  collectionHistory: [collectionHistorySchema], // Updated to use the defined sub-schema
  // Add a field to track the total amount collected so far
  totalCollected: { type: Number, default: 0 },
    invoice_id: { type: String, default: uuidv4 ,  index: true },
    client_id: { type: String, required: true,   index: true },
    paid: { type: Boolean, required: true,default:false},

    brandName: {
      type: String,
      required: false
  },
  billType: {
    type: String,
    required: false
},

discount: {
  type: String,
  required: false
},
    services:[{

        product: {
            type: String,
            required: false, 
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
      createdAt: { type: Date, default: Date.now }, // Added createdAt field
      collectionHistory:{
        amountCollected:String,
      }




});

const Invoice = mongoose.model('invoice', invoiceSchema);

module.exports = Invoice ;
