const schemas = require("../../mongodb/schemas/schemas");

getAllSlips= async (req, res) => {
    try {
        const slips = await schemas.salarySlip.find({});
        res.status(200).json(slips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllSlips;
