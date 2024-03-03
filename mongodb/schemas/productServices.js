const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const productServicesSchema = new mongoose.Schema({
    product_id: {
        type: String,
        default: uuidv4, 
        unique: true,
        index: true 
    },
    product: {
        type: String,
        required: true, // Make the product name a required field
    },
    unitPrice: {
        type: Number,
        required: true, // Make the unit price a required field
     
    }
}, {
    timestamps: true // Add createdAt and updatedAt timestamps to each document
});

const productServices = mongoose.model('productServices', productServicesSchema);

module.exports = productServices;
