const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const calendarSchema = new mongoose.Schema({
    calender_id: {
        type: String,
        default: uuidv4,
        unique: true,
        index: true
    },
    client_id: {
        type: String,
        index: true,
        required: true

    },
    type: {
        type: String,
        enum: ['company', 'festive', 'other'], 
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;
