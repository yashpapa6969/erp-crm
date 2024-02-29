const schemas = require("../../mongodb/schemas/schemas");

getAllSlipsByEmployee= async (req, res) => {
    try {
        const { slip_id } = req.params; 

        const slips = await schemas.salarySlip.find({slip_id:slip_id});
        res.status(200).json(slips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllSlipsByEmployee;
