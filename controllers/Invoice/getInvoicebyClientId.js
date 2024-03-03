const schemas = require("../../mongodb/schemas/schemas");

getAllInvoiceByClient= async (req, res) => {
    try {
        const { client_id } = req.params; 

        const slips = await schemas.Invoice.find({client_id:client_id});
        res.status(200).json(slips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllInvoiceByClient;
