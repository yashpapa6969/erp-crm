const schemas = require("../../mongodb/schemas/schemas");

async function updateProjectPriority(req, res) {

    try {
        const { project_id } = req.params;
        const { priority } = req.params;

        const project = await schemas.Project.findOne({ project_id: project_id });

        if (!project) {
            return res.status(404).json({ message: "project not found" });
        }

        switch (parseInt(priority)) {
            case 0:
                project.priority = 'Low';
                break;
            case 1:
                project.priority = 'Medium';
                break;
            case 2:
                project.priority = 'Hight';
               
                break;
           
            default:
                project.priority = 'Low';
                break;
        }

        await project.save();

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = updateProjectPriority;

