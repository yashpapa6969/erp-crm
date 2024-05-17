const schemas = require("../../mongodb/schemas/schemas");
const { buildDateRangeQuery } = require("../../middleware/rangeFilter");
getAllClients= async (req, res) => {
    const { financialYear, month, quarter, firstQuarterMonth } = req.body;

    try {
        const query = buildDateRangeQuery(financialYear, month, quarter, firstQuarterMonth);
        const clients = await schemas.Client.find(query);
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllClients;
