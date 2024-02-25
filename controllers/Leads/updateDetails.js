const schemas = require("../../mongodb/schemas/schemas");


const updateLead= async (req, res) => {
    const { lead_id } = req.params;
    const updateData = req.body;
  
    try {
      const updatedLead = await schemas.Lead.find({lead_id:lead_id, updateData}, { new: true });
      if (!updatedLead) {
        return res.status(404).send({ message: 'Client not found' });
      }
      res.send(updatedLead);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  module.exports =updateLead;