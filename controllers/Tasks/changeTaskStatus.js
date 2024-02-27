const schemas = require("../../mongodb/schemas/schemas");

async function updateTaskStatus(req, res) {

    try {
        const { task_id } = req.params;
        const { status } = req.params;

        const task = await schemas.Task.findOne({ task_id: task_id });
        console.log(lead);

        if (!task) {
            return res.status(404).json({ message: "task not found" });
        }

        switch (parseInt(status)) {
            case 0:
                lead.status = 'Not Started';
                break;
            case 1:
                lead.status = 'Working';
                break;
            case 2:
                lead.status = 'Awaited Feedback';
               
                break;
            case 3:
                lead.status = 'Completed';
                break;
            default:
                lead.status = 'Not Started';
                break;
        }

        await task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = updateTaskStatus;

