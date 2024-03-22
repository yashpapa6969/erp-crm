const schemas = require("../../mongodb/schemas/schemas");

getAllInvoiceByBrand= async (req, res) => {
    try {
        const { brandName } = req.body; 

        const invoices = await schemas.Invoice.find({brandName:brandName});
        console.log(invoices)
        const invoiceIds = invoices.map(invoice => invoice.invoice_id);

        res.status(200).json({invoices,invoiceIds});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllInvoiceByBrand;
