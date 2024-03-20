const schemas = require("../../mongodb/schemas/schemas");

const getLeaveByStatus = async (req, res) => {
    const { financialYear, month } = req.query; // Assuming financialYear and month are query parameters

    let matchStage = {}; // Initialize match stage as empty, which matches all documents by default

    // Only add filtering logic if financialYear is provided and is valid
    if (financialYear) {
        const year = parseInt(financialYear, 10);
        // Ensure the financialYear is a valid number
        if (isNaN(year)) {
            return res.status(400).json({ message: 'Invalid financialYear provided.' });
        }

        let startDate, endDate;

        if (month) {
            // If month is specified, calculate the date range for that month
            const monthInt = parseInt(month, 10);
            if (monthInt < 1 || monthInt > 12) {
                return res.status(400).json({ message: 'Invalid month provided.' });
            }
            startDate = new Date(year, monthInt - 1, 1);
            endDate = new Date(year, monthInt, 0);
        } else {
            // If only year is specified, consider the entire financial year
            // Assuming financial year starts from April
            startDate = new Date(year, 3, 1); // April of the current year
            endDate = new Date(year + 1, 2, 31); // March of the next year
        }

        // Update matchStage to filter by the calculated date range
        matchStage.createdAt = { $gte: startDate, $lte: endDate };
    }

    // Build the aggregation pipeline with optional matching
    try {
        const pipeline = [
            { $match: matchStage }, // This will be an empty match if no dates were provided
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ];

        const statusCounts = await schemas.LeaveRequest.aggregate(pipeline);
        res.json(statusCounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = getLeaveByStatus;
