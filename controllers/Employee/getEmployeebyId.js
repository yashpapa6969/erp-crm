const schemas = require("../../mongodb/schemas/schemas");

const getEmployeeDetails = async (req, res) => {
    const { employee_id } = req.params; // Assuming you're using a route parameter

    try {
        const employee = await schemas.Employee.findOne({ employee_id: employee_id });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid employee ID" });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = getEmployeeDetails;
