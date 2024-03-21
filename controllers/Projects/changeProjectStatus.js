const schemas = require("../../mongodb/schemas/schemas");

async function updateProjectStatus(req, res) {

    try {
        const { project_id } = req.params;
        const { status } = req.params;

        const project = await schemas.Project.findOne({ project_id: project_id });

        if (!project) {
            return res.status(404).json({ message: "project not found" });
        }

        switch (parseInt(status)) {
            case 0:
                project.status = 'Not Started';
                break;
            case 1:
                project.status = 'Working';
                break;
            case 2:
                project.status = 'Awaited Feedback';
               
                break;
            case 3:
                project.status = 'Completed';
                break;
            default:
                project.status = 'Not Started';
                break;
        }

        await project.save();

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = updateProjectStatus;

