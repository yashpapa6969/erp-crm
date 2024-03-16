const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const leaveRequestSchema = new mongoose.Schema({
    employee_id: { type: String, required: true },

    leave_id: { type: String, default: uuidv4, index: true },
    type: {
        type: String,
        required: true,
        enum: ['Annual', 'Sick', 'Maternity', 'Paternity', 'Unpaid', 'Other']
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    reason: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },

});

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);

module.exports = LeaveRequest;
