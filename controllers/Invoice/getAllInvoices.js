const schemas = require("../../mongodb/schemas/schemas");

getAllInvoices= async (req, res) => {
    try {
        const slips = await schemas.Invoice.find({});
        res.status(200).json(slips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllInvoices;
