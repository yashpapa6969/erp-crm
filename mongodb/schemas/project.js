const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const projectSchema = new mongoose.Schema({
    project_id: { type: String, default: uuidv4 },
    projectName: {
        type: String,
        required: true
    },
    client_id: { 
        type: String,
        required: true
    },
    progress: { 
        type: Number,
        required: true,
        default: 0 
    },
    billingType: {
        type: String,
        required: true,
        enum: ['Hourly', 'Fixed Price', 'Retainer'],
        default: 'Hourly'
    },
    status: {
        type: String,
        required: true,
        enum: ['Not Started', 'In Progress', 'Completed', 'On Hold'],
        default: 'Not Started'
    },
    totalRate: {
        type: Number, 
        required: function() { return this.billingType !== 'Hourly'; } 
    },
    estimatedHours: { 
        type: Number,
        required: false 
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: { 
        type: Date
    },
    tags: [{ 
        type: String
    }],
    description: {
        type: String,
        required: false
    },
    employees: [{
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(v);
            },
            message: props => `${props.value} is not a valid UUID format for employee_id`
        }
    }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
