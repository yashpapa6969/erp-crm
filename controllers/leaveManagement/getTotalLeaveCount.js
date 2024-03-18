
const schemas = require("../../mongodb/schemas/schemas");

const getTotalLeaveCount = async (req, res) => {
    try {
        const totalLeaveCount = await schemas.LeaveRequest.countDocuments({});
        res.json({ totalLeaveCount });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = getTotalLeaveCount;
