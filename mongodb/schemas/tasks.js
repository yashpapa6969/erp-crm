const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const taskSchema = new mongoose.Schema({
    task_id: { type: String, default: uuidv4 },
    projectName: {
        type: String,
        required: true
    },
    client_id: { 
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
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
        type: String,
        required: true,
    },
    deadline: { 
        type: String
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
    }]
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
