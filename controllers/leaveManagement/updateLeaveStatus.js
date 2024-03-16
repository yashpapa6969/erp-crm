const schemas = require("../../mongodb/schemas/schemas");

const updateLeaveStatus = async (req, res) => {
  try {
    const { leave_id,status } = req.params;

    // Validate if the provided status is one of the allowed values
    const allowedStatusValues = ['Pending', 'Approved', 'Rejected'];
    if (!allowedStatusValues.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status value' });
    }

    // Find the leave request by ID and update its status
    const updatedLeaveRequest = await schemas.LeaveRequest.findOneAndUpdate(
      {leave_id:leave_id},
      { status },
      { new: true }
    );

    // If the leave request doesn't exist, return a 404 error
    if (!updatedLeaveRequest) {
      return res.status(404).json({ success: false, error: 'Leave request not found' });
    }

    // Return the updated leave request
    res.json({ success: true, data: updatedLeaveRequest });
  } catch (err) {
    // Handle any errors
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = updateLeaveStatus;
