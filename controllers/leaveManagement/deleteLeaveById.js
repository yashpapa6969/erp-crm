const schemas = require("../../mongodb/schemas/schemas");

const deleteLeaveById = async (req, res) => {
  try {
    // Extract the leave ID from the request parameters
    const leaveId = req.params.leave_id;

    // Find the leave request by ID and delete it from the database
    const deletedLeave = await schemas.LeaveRequest.findOneAndDelete({ leave_id: leaveId });

    // If leave with the given ID is not found, return a 404 response
    if (!deletedLeave) {
      return res.status(404).json({ success: false, error: "Leave not found" });
    }

    // Respond with a success message
    res.status(200).json({ success: true, data: deletedLeave, message: "Leave deleted successfully" });
  } catch (err) {
    // If an error occurs, respond with an error message
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = deleteLeaveById;
