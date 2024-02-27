const schemas = require("../../mongodb/schemas/schemas");

const getTasksByTaskID = async (req, res) => {
    const { task_id } = req.params; 

    try {
        const employee = await schemas.Task.find({ task_id: task_id });
        if (!employee) {
            return res.status(404).json({ message: "task_id not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "task_id  ID" });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = getTasksByTaskID;
