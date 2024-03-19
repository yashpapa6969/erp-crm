
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const letterSchema = new mongoose.Schema({
    letter_id: { type: String, default: uuidv4, index: true },
    name: {
        type: String,
        required: true
    },
    singleFile: {
        type: String,
        required: false
    },
    createdAt: { type: Date, default: Date.now }, // Added createdAt field

},);

const Letter = mongoose.model('Letter', letterSchema);

module.exports = Letter;
