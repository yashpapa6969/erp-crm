const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const invoiceSchema = new mongoose.Schema({
    invoive_id: { type: String, default: uuidv4 },
    client_id: { type: String, required: true, },
    services:{
        serviceDescription: String,
        duration: String,
        quantity: Number,
        unitPrice: Number,
        total: Number,
        startDate:String,
        endDate:String,
    },
    subtotal:{ type: Number, required: true, },
    gst:{ type: Number, required: true, },
    total:{ type: Number, required: true, },



});

const Invoice = mongoose.model('invoice', invoiceSchema);

module.exports = Invoice ;
