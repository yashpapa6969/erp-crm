const schemas = require("../../mongodb/schemas/schemas");

const getTasksByEmployeeID = async (req, res) => {
    const { employee_id } = req.params; 

    try {
        const employee = await schemas.Task.find({ employee_id: employee_id });
        if (!employee) {
            return res.status(404).json({ message: "employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "employee  ID" });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = getTasksByEmployeeID;
