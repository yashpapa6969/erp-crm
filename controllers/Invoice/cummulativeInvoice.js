const schemas = require("../../mongodb/schemas/schemas");

exports.handleCumulativeInvoices = async (req, res) => {
    try {
        const { invoiceIds } = req.body;

        if (!invoiceIds || invoiceIds.length === 0) {
            return res.status(400).json({ error: "No invoice IDs provided" });
        }

        const invoices = await schemas.Invoice.find({
            'invoice_id': { $in: invoiceIds }
        });

        if (invoices.length !== invoiceIds.length) {
            return res.status(404).json({ error: "One or more invoices not found" });
        }

        const clientId = invoices[0].client_id;
        if (!invoices.every(invoice => invoice.client_id === clientId)) {
            return res.status(400).json({ error: "Invoices do not belong to the same client" });
        }

        const totalAmount = invoices.reduce((acc, invoice) => acc + invoice.total, 0);

        res.json({ clientId, totalAmount });
    } catch (error) {
        console.error("Failed to handle cumulative invoices:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
