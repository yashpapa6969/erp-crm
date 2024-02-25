const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const clientSchema = new mongoose.Schema({
    client_id: { type: String, default: uuidv4 },
    clientName: {
        type: String,
        required: true
    },
    contactName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    phone: {
        type: String,
        required: false,
        validate: {
            validator: function(phone) {
                return /^\+?[1-9]\d{1,14}$/.test(phone);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    industry: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
 
    website: {
        type: String,
        required: false
    },
    groups: [{
        type: String,
        enum: ['High Budget', 'Low Budget', 'VIP', 'Wholesaler'],
        required: false
    }],
    currency: {
        type: String,
        required: false
    },
    defaultLanguage: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    zipCode: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'working', 'client', 'contacted','proposal'], // Add more statuses as needed
        default: 'new' // Default status for new employees
    },
    status: {
        type: String,
        required: true,
        enum: ['Raw', 'In-Progress', 'Converted', 'Lost'],
        default: 'new' // Default status for new employees
    },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
