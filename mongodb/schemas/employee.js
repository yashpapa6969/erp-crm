const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: false },
    contactNo: { type: String, required: true },
    type: { type: String, required: false },
    dob: {
        type: String,
        required: true,
        unique: false,
    },
    position: {
        type: String,
        required: false,
        enum: ['superadmin', 'admin', 'user', "manager"],
    },
    department: { type: String, required: false, },
    designation: { type: String, required: true, },

    employee_id: { type: String, default: uuidv4,index: true },
    manager_id: { type: String, required: false, },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: { type: String, required: true },
    joiningDate: { type: String, required: true },
    probationPeriod: { type: String, required: true },
    leavingDate: { type: String, required: false },


    permissions: [{
        type: String,
        default: ['read_access']
    }],

    aadharNumber: {
        type: String,
        required: true,
        unique: false,
    },
    panNumber: {
        type: String,
        required: true,
        unique: false,
    },
    permanentAddress: {
        type: String,
        required: true,
        unique: false,
    },
    correspondenceAddress: {
        type: String,
        required: true,
        unique: false,
    },
    guardianDetails: {
        guardianName: {
            type: String,
            required: true,
            unique: false,
        },
        relation: {
            type: String,
            required: true,
            unique: false,
        },

        guardianContactNo: { type: String, required: true },
    },
    bankDetails: {
        bankName: {
            type: String,
            required: true,
            unique: false,
        },
        bankAccountNo: { type: String, required: true },

        bankIfscCode: { type: String, required: true },
        type: { type: String, required: true },
        branch: { type: String, required: true },


    },

    singleFile: {
        type: String,
        required: false // Set to true if it should be required
    },
    multipleFiles: [{
        type: String,
        required: false
    }],

});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
