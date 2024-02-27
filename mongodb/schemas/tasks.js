const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const taskSchema = new mongoose.Schema({
    task_id: { type: String, default: uuidv4 },
    
    brandName: {
        type: String,
        required: true
    },
client_id: {
        type: String,
        required: true
    },
    project_id: {
        type: String,
        required: true
    },
    employee_id: {
        type: String,
        required: true
    },
   
    priority: {
        type: String,
        required: true
    },
  
    status: {
        type: String,
        required: false,
        enum: ['Not Started', 'Working', 'Awaited Feedback', 'Completed'],
        default: 'Not Started'
    },
   


    startDate: {
        type: String,
        required: true,
    },
    deadline: { 
        type: String,
        required: true,

    },
 
    description: {
        type: String,
        required: true
    },
  
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
