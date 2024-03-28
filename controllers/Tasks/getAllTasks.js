const schemas = require("../../mongodb/schemas/schemas");

const getAllTask = async (req, res) => {
    try {
        let pipeline = [
            {
                $match: {
                    status: { $ne: "Completed" }
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

        const tasks = await schemas.Task.aggregate(pipeline);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllTask;
