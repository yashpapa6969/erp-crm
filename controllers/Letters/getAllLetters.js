const schemas = require("../../mongodb/schemas/schemas");
const { buildDateRangeQuery } = require("../../middleware/rangeFilter");
getAllLetters= async (req, res) => {
    
    const { financialYear, month, quarter, firstQuarterMonth } = req.body;
    try {
        const query = buildDateRangeQuery(financialYear, month, quarter, firstQuarterMonth);
        const letters = await schemas.Letter.find(query);
        res.status(200).json(letters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllLetters;
