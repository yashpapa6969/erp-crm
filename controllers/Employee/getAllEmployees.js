const schemas = require("../../mongodb/schemas/schemas");

getAllEmployees= async (req, res) => {
    try {
        const employees = await schemas.Employee.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllEmployees;
