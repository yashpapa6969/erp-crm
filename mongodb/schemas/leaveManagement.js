const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
    employee_id: { type: String, required:true },

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
    createdAt: { type: Date, default: Date.now }, // Added createdAt field

});

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);

module.exports = LeaveRequest;
