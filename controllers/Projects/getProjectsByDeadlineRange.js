const schemas = require("../../mongodb/schemas/schemas");

const getProjectCountsByDeadlineRange = async (req, res) => {
    const { deadlineMin, deadlineMax } = req.query;
    try {
        const deadlineRangeCounts = await schemas.Project.aggregate([
            {
                $match: {
                    deadline: {
                        $gte: new Date(deadlineMin),
                        $lte: new Date(deadlineMax)
                    }
                }
            },
            { $group: { _id: "$deadline", count: { $sum: 1 } } }
        ]);
        res.json(deadlineRangeCounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = getProjectCountsByDeadlineRange;
