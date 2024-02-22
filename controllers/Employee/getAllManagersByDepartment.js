const schemas = require("../../mongodb/schemas/schemas");

const getAllManagersbyDepartment = async (req, res) => {
    try {
        const { department } = req.params; 

        const managers = await schemas.Employee.find({ position: "manager" ,department: department});

        if (managers.length === 0) {
            return res.status(404).json({ message: "No managers found" });
        }

        res.status(200).json(managers);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid query parameters" });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllManagersbyDepartment;
