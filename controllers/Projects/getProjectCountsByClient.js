const schemas = require("../../mongodb/schemas/schemas");

const getProjectCountsByClient = async (req, res) => {
    try {
        const clientCounts = await schemas.Project.aggregate([
            {
                $group: {
                    _id: "$client_id",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0, // Exclude _id field
                    client_id: "$_id",
                    count: 1
                }
            }
        ]);
        res.json(clientCounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = getProjectCountsByClient;
