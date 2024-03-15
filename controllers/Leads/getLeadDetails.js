const schemas = require("../../mongodb/schemas/schemas");

const getLeadDetails = async (req, res) => {
    const { lead_id} = req.params; // Assuming you're using a route parameter

    try {
        const lead = await schemas.Lead.findOne({ lead_id: lead_id});
        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }
        res.status(200).json(lead);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid Client ID" });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = getLeadDetails;
