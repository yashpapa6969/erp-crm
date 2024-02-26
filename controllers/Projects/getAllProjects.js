const schemas = require("../../mongodb/schemas/schemas");

getAllProjects= async (req, res) => {
    try {
        const projects = await schemas.Project.find({});
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllProjects;
