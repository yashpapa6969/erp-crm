const schemas = require("../../mongodb/schemas/schemas");

const getProjectDetails = async (req, res) => {
    const { project_id } = req.params; 

    try {
        const projects = await schemas.Project.findOne({ project_id: project_id });
        if (!projects) {
            return res.status(404).json({ message: "projects not found" });
        }
        res.status(200).json(projects);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid project ID" });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = getProjectDetails;
