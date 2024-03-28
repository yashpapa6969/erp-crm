const schemas = require("../../mongodb/schemas/schemas");

const getAllCompletedProjects = async (req, res) => {
    try {
        let pipeline = [
            {
                $match: {
                    status: "Completed"
                }
            },
            {
                $addFields: {
                    sortPriority: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$priority", "Urgent"] }, then: 1 },
                                { case: { $eq: ["$priority", "High"] }, then: 2 },

                                { case: { $eq: ["$priority", "Medium"] }, then: 3 },
                                { case: { $eq: ["$priority", "Low"] }, then: 4 }
                            ],
                            default: 0 // Default case, replace with appropriate value or action

                            
                        }
                    }
                }
            },
            {
                $sort: { sortPriority: 1 }
            },
            {
                $project: { sortPriority: 0 }
            }
        ];

        const projects = await schemas.Project.aggregate(pipeline);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllCompletedProjects;
