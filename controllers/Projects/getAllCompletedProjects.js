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
                                { case: { $eq: ["$priority", "High"] }, then: 1 },
                                { case: { $eq: ["$priority", "Medium"] }, then: 2 },
                                { case: { $eq: ["$priority", "Low"] }, then: 3 }
                            ],
                            default: 4
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
