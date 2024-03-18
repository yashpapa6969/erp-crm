const schemas = require("../../mongodb/schemas/schemas");

const createLeave = async (req, res) => {
  try {
    const {
      employee_id,
      type,
      startDate,
      endDate,
      createdAt,
      status,
      reason
    } = req.body;

    const leaveRequest = await schemas.LeaveRequest.create({
      employee_id,
      type,
      startDate,
      endDate,
      status,
      reason
    });

    res.status(201).json({ success: true, data: leaveRequest });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = createLeave;