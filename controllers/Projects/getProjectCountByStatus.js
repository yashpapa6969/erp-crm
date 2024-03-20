const schemas = require("../../mongodb/schemas/schemas");

const getProjectCountsByStatus = async (req, res) => {
    // Extract financialYear and month from query parameters
    const { financialYear, month } = req.query;

    let pipeline = [];

    if (financialYear) {
        // Parse the financialYear to a number
        const year = parseInt(financialYear, 10);

        if (isNaN(year)) {
            // If financialYear is invalid, return an error
            return res.status(400).json({ message: 'Invalid financialYear provided.' });
        }

        let startDate, endDate;

        if (month) {
            // If a specific month is provided
            const monthInt = parseInt(month, 10);
            if (monthInt < 1 || monthInt > 12) {
                return res.status(400).json({ message: 'Invalid month provided.' });
            }
            startDate = new Date(year, monthInt - 1, 1); // Month is 0-indexed
            endDate = new Date(year, monthInt, 0); // Last day of the month
        } else {
            // If only the year is provided, consider the entire year
            startDate = new Date(year, 0, 1); // Start from January
            endDate = new Date(year + 1, 0, 0); // Up to the end of December
        }

        // Add a match stage to the pipeline to filter documents by date
        pipeline.push({
            $match: {
                createdAt: { $gte: startDate, $lte: endDate }
            }
        });
    }

    // Add the grouping stage to the pipeline
    pipeline.push({
        $group: {
            _id: "$status",
            count: { $sum: 1 }
        }
    });

    try {
        const statusCounts = await schemas.Project.aggregate(pipeline);
        res.json(statusCounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = getProjectCountsByStatus;
