const schemas = require("../../mongodb/schemas/schemas");

const getClientDetails = async (req, res) => {
    const { client_id } = req.params; // Assuming you're using a route parameter

    try {
        const employee = await schemas.Client.findOne({ client_id: client_id });
        if (!employee) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid Client ID" });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = getClientDetails;
