const schemas = require("../../mongodb/schemas/schemas");

const getLeadByStatus = async (req, res) => {
    try {
        const statusCounts = await schemas.Lead.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        res.json(statusCounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = getLeadByStatus;