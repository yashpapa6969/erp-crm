const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const clientSchema = new mongoose.Schema(
    {
    client_id: { type: String, default: uuidv4 ,        index: true     },
    gender: {
        type: String,
        required: true
    },
   
    title: {
        type: String,
        required: true
    },
    enquiryDate: {
        type: String,
        required: true
    },
    source: {
        type: Array,
        required: true
    },
    sourceInformation: {
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
   
    phone1: {
        type: String,
        required: true,
        validate: {
            validator: function(phone) {
                return /^\+?[1-9]\d{1,14}$/.test(phone);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    phone2: {
        type: String,
        required: false,
        validate: {
            validator: function(phone) {
                return /^\+?[1-9]\d{1,14}$/.test(phone);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email1: {
        type: String,
        required: false,
        unique: true,
        validate: {
            validator: function(email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    email2: {
        type: String,
        required: false,
        unique: false,
        validate: {
            validator: function(email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    website: {
        type: String,
        required: false
    },
    businessAddress: {
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
    pincode: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    requirement: {
        type: Array,
        required: false
    },
    additionalInformation: {
        type: String,
        required: false
    },
   
    singleFile: {
        type: String,
        required: false // Set to true if it should be required
    },
    multipleFiles: [{
        type: String,
        required: false
    }],
    clientBirthday: {
        type: String,
        required: false
    },
    gstNo: {
        type: String,
        required: false
    },
    clientAnniversary: {
        type: String,
        required: false
    },
    workStartDate: {
        type: String,
        required: false
    },
    companyAnniversary: {
        type: String,
        required: false
    },
    billingAddress: {
        type: String,
        required: false
    },

    
  
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
