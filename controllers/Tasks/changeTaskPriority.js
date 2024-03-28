const schemas = require("../../mongodb/schemas/schemas");

async function updateTaskPriority(req, res) {

    try {
        const { task_id } = req.params;
        const { priority } = req.params;

        const tasks = await schemas.Task.findOne({ task_id: task_id });

        if (!tasks) {
            return res.status(404).json({ message: "Task not found" });
        }

        switch (parseInt(priority)) {
            case 0:
                tasks.priority = 'Low';
                break;
            case 1:
                tasks.priority = 'Medium';
                break;
            case 2:
                tasks.priority = 'High';
                break;
                case 3:
                    tasks.priority = 'Urgent';
                    break;
            default:
                tasks.priority = 'Low';
                break;
        }

        await tasks.save();

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = updateTaskPriority;

