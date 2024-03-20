const schemas = require("../../mongodb/schemas/schemas");

async function updateProjectStatus(req, res) {

    try {
        const { task_id } = req.params;
        const { status } = req.params;

        const task = await schemas.Task.findOne({ task_id: task_id });

        if (!task) {
            return res.status(404).json({ message: "task not found" });
        }

        switch (parseInt(status)) {
            case 0:
                task.status = 'Not Started';
                break;
            case 1:
                task.status = 'Working';
                break;
            case 2:
                task.status = 'Awaited Feedback';
               
                break;
            case 3:
                task.status = 'Completed';
                break;
            default:
                task.status = 'Not Started';
                break;
        }

        await task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = updateProjectStatus;

