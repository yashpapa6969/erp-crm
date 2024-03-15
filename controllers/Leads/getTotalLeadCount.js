const schemas = require("../../mongodb/schemas/schemas");

const getTotalLeadCount = async (req, res) => {
    try {
        const totalLeadCount = await schemas.Lead.countDocuments({});
        res.json({ totalLeadCount });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = getTotalLeadCount;
