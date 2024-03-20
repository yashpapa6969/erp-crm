const schemas = require("../../mongodb/schemas/schemas");

const getAllProjects = async (req, res) => {
    try {
        // Retrieve the priority from query parameters
        const { priority } = req.query;

        // Build the query object based on the presence of the priority parameter
        let query = {};
        if (priority) {
            // Validate the priority is one of the expected values
            if (["Low", "Medium", "High"].includes(priority)) {
                query.priority = priority;
            } else {
                return res.status(400).json({ message: "Invalid priority value" });
            }
        }

        const projects = await schemas.Project.find(query);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllProjects;
