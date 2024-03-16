const schemas = require("../../mongodb/schemas/schemas");

const updateLeave = async (req, res) => {
    try {
        const { leave_id } = req.params;
        let { startDate, endDate, ...updateFields } = req.body;
        const existingLeave = await schemas.LeaveRequest.findOne({ leave_id: leave_id });
        let updatedAt = new Date();
        if (startDate) {
            startDate = new Date(startDate);
        }
        else {
            startDate = existingLeave.startDate;
        }
        if (endDate) {
            endDate = new Date(endDate);
        }
        else {
            endDate = existingLeave.endDate;
        }
        const updatedLeaveRequest = await schemas.LeaveRequest.findOneAndUpdate(
            { leave_id: leave_id },
            { ...updateFields, updatedAt, startDate, endDate },
            { new: true }
        );

        if (!updatedLeaveRequest) {
            return res.status(404).json({ success: false, error: 'Leave request not found' });
        }

        res.json({ success: true, data: updatedLeaveRequest });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = updateLeave;
