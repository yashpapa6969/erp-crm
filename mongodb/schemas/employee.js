const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: {
        type: String,
        required: true,
        unique: false,
    
    },
    position: {
        type: String,
        required: true,
        enum: ['superadmin', 'admin', 'user',"manager"],
    },
    department: { type: String, required: true,},
    employee_id: { type: String, default: uuidv4 },
    manager_id:{ type: String, required: true,},
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
    password: { type: String, required: true },
    joiningDate: { type: String, required: true },
    permissions: [{ 
        type: String,
        default: ['read_access']
    }]

});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
