const schemas = require("../../mongodb/schemas/schemas");
const { buildDateRangeQuery } = require("../../middleware/rangeFilter");
getAllEmployees= async (req, res) => {
    const { financialYear, month, quarter, firstQuarterMonth } = req.body;
    try {
        const query = buildDateRangeQuery(financialYear, month, quarter, firstQuarterMonth);
        const employees = await schemas.Employee.find(query);
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllEmployees;
