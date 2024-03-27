const schemas = require("../../mongodb/schemas/schemas");

getAllPaidInvoices = async (req, res) => {
    try {
        // Filter to find only the invoices where `paid` is true
        const paidInvoices = await schemas.Invoice.find({ paid: true });
        res.status(200).json(paidInvoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllPaidInvoices;
