const schemas = require("../../mongodb/schemas/schemas");


const deleteClientById = async (req, res) => {
  const client_id = req.params.client_id;

  try {
    const deletedClient = await schemas.Client.findOne({client_id:client_id});

    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found." });
    }
    await schemas.Client.deleteOne({client_id});


    res.status(200).json({ message: "Client deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  deleteClientById;