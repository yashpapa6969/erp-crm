
const schemas = require("../../mongodb/schemas/schemas");
const { buildDateRangeQuery } = require("../../middleware/rangeFilter");

const getAllInvoicesFilter = async (req, res) => {
    const { financialYear, month, quarter, firstQuarterMonth } = req.body;

    if (!firstQuarterMonth) {
        return res.status(400).json({ message: 'First quarter month is required.' });
    }

    try {
        const query = buildDateRangeQuery(financialYear, month, quarter, firstQuarterMonth);

        const invoices = await schemas.Invoice.find(query);

        res.status(200).json(invoices);
    } catch (error) {
        console.error(error);
        if (error.message.includes('Invalid')) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = getAllInvoicesFilter;
