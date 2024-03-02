const schemas = require("../../mongodb/schemas/schemas");

getAllSlipsByEmployee= async (req, res) => {
    try {
        const { employee_id } = req.params; 

        const slips = await schemas.salarySlip.find({employee_id:employee_id});
        res.status(200).json(slips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllSlipsByEmployee;
