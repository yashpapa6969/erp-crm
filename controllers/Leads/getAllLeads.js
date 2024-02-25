const schemas = require("../../mongodb/schemas/schemas");

getAllLeads= async (req, res) => {
    try {
        const leads = await schemas.Lead.find({});
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllLeads;
