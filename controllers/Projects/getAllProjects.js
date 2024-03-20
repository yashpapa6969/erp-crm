const schemas = require("../../mongodb/schemas/schemas");

const getAllProjects = async (req, res) => {
    try {
        // Build the aggregation pipeline
        let pipeline = [
            {
                // Add a field that represents the custom sort order based on priority
                $addFields: {
                    sortPriority: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$priority", "High"] }, then: 1 },
                                { case: { $eq: ["$priority", "Medium"] }, then: 2 },
                                { case: { $eq: ["$priority", "Low"] }, then: 3 }
                            ],
                            default: 4 // Handles cases where priority might not be set or is unexpected
                        }
                    }
                }
            },
            {
                // Sort by the custom sortPriority field in ascending order (1 before 2 before 3)
                $sort: { sortPriority: 1 }
            },
            {
                // Optionally, you can remove the sortPriority field if you don't want it in the final output
                $project: { sortPriority: 0 }
            }
        ];

        const projects = await schemas.Project.aggregate(pipeline);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllProjects;
