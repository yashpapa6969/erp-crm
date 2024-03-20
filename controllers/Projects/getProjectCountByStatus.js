const schemas = require("../../mongodb/schemas/schemas");

const getProjectCountsByStatus = async (req, res) => {
    const { financialYear, month } = req.params; // Use req.params here

    let pipeline = [];
    let startDate, endDate;

    if (financialYear) {
        // Parse the financialYear to a number
        const year = parseInt(financialYear, 10);

        if (isNaN(year)) {
            // If financialYear is invalid, return an error
            return res.status(400).json({ message: 'Invalid financialYear provided.' });
        }


        if (month) {
            // If a specific month is provided
            const monthInt = parseInt(month, 10);
            if (monthInt < 1 || monthInt > 12) {
                return res.status(400).json({ message: 'Invalid month provided.' });
            }
            startDate = new Date(year, monthInt - 1, 1); // Month is 0-indexed
            endDate = new Date(year, monthInt, 0); // Last day of the month
        } else {
            startDate = new Date(year, 0, 1); // Start from January
            endDate = new Date(year + 1, 0, 0); // Up to the end of December
        }

        pipeline.push({
            $match: {
                createdAt: { $gte: startDate, $lte: endDate }
            }
        });
    }

    pipeline.push({
        $group: {
            _id: "$status",
            count: { $sum: 1 }
        }
    });

    try {
        console.log({ startDate, endDate });
        console.log(JSON.stringify(pipeline, null, 2));

        const statusCounts = await schemas.Project.aggregate(pipeline);
        res.json(statusCounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = getProjectCountsByStatus;
