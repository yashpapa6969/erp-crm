const schemas = require("../../mongodb/schemas/schemas");


const updateLead= async (req, res) => {
    const { client_id } = req.params;
    const updateData = req.body;
  
    try {
      const updatedClient = await schemas.Client.find({client_id:client_id, updateData}, { new: true });
      if (!updatedClient) {
        return res.status(404).send({ message: 'Client not found' });
      }
      res.send(updatedClient);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  module.exports =updateLead;