const schemas = require("../../mongodb/schemas/schemas");

const getTotalProjectCount = async (req, res) => {
    try {
        const totalProjectCount = await schemas.Project.countDocuments({});
        res.json({ totalProjectCount });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = getTotalProjectCount;
