const schemas = require("../../mongodb/schemas/schemas");

getAllClients= async (req, res) => {
    try {
        const clients = await schemas.Client.find({});
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllClients;
