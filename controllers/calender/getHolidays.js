const schemas = require("../../mongodb/schemas/schemas");
const { buildDateRangeQuery } = require("../../middleware/rangeFilter");
const getHolidays = async (req, res) => {
    const { financialYear, month, quarter, firstQuarterMonth } = req.body;
    try {
        const query = buildDateRangeQuery(financialYear, month, quarter, firstQuarterMonth);
        const holidays = await schemas.Calendar.find(query);
        res.status(200).json({ holidays });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


module.exports =  getHolidays;
