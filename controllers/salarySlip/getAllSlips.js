const schemas = require("../../mongodb/schemas/schemas");
const { buildDateRangeQuery } = require("../../middleware/rangeFilter");
getAllSlips= async (req, res) => {
    const { financialYear, month, quarter, firstQuarterMonth } = req.body;
    try {
        const query = buildDateRangeQuery(financialYear, month, quarter, firstQuarterMonth);
        const slips = await schemas.salarySlip.find(query);
        res.status(200).json(slips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllSlips;
