const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const taskSchema = new mongoose.Schema({
    task_id: { type: String, default: uuidv4 ,        index: true 
    },
    
    brandName: {
        type: String,
        required: true
    },
client_id: {
        type: String,
        required: true,        index: true 

    },
    project_id: {
        type: String,
        required: true,         index: true 

    },
    employee_id: {
        type: String,
        required: true,        index: true 

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
    createdAt: { type: Date, default: Date.now }, // Added createdAt field

});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
