const schemas = require("../../mongodb/schemas/schemas");
const { buildDateRangeQuery } = require("../../middleware/rangeFilter");
getAllLeads= async (req, res) => {
    const { financialYear, month, quarter, firstQuarterMonth } = req.body;
    try {
        const query = buildDateRangeQuery(financialYear, month, quarter, firstQuarterMonth);
        const leads = await schemas.Lead.find(query);
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllLeads;
