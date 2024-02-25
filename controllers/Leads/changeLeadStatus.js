const schemas = require("../../mongodb/schemas/schemas");

const updateLeadStatus = async (req, res) => {
    try {
        const  lead_id  = req.params; 
        const  status  = req.params; 

        const lead = await schemas.Lead.find({lead_id:lead_id});

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        switch (status) {
            case 0:
                lead.status = 'Raw';
                break;
            case 1:
                lead.status = 'In-Progress';
                break;
            case 2:
                lead.status = 'Converted';
                break;
            case 3:
                lead.status = 'Lost';
                break;
            default:
                lead.status = 'Raw'; 
                break;
        }

        await lead.save();

        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = updateLeadStatus;
