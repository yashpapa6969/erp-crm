const schemas = require("../../mongodb/schemas/schemas");

const getProjectCountsByStatus = async (req, res) => {
    const { financialYear, month, quarter, firstQuarterMonth } = req.body;

    let startDate, endDate;
    const pipeline = [];

    if (financialYear) {
        const year = parseInt(financialYear, 10);
        const firstQMonth = parseInt(firstQuarterMonth || '4', 10) - 1;

        if (!isNaN(year) && firstQMonth >= 0 && firstQMonth <= 11) {
            try {
                if (month) {
                    const monthInt = parseInt(month, 10) - 1;
                    if (monthInt >= 0 && monthInt <= 11) {
                        startDate = new Date(year, monthInt, 1);
                        endDate = new Date(year, monthInt + 1, 0);
                    }
                } else if (quarter) {
                    const quarterInt = parseInt(quarter, 10);
                    if (quarterInt >= 1 && quarterInt <= 4) {
                        const startMonth = (firstQMonth + (quarterInt - 1) * 3) % 12;
                        const startYear = year + Math.floor((firstQMonth + (quarterInt - 1) * 3) / 12);
                        startDate = new Date(startYear, startMonth, 1);
                        const endMonth = (startMonth + 3) % 12;
                        const endYear = startYear + (endMonth < startMonth ? 1 : 0);
                        endDate = new Date(endYear, endMonth, 0);
                    }
                } else {
                    startDate = new Date(year, firstQMonth, 1);
                    endDate = new Date(year + 1, firstQMonth, 0);
                }
                
                if (startDate && endDate) {
                    pipeline.push({
                        $match: {
                            createdAt: { $gte: startDate, $lte: endDate }
                        }
                    });
                }
            } catch (err) {
                return res.status(500).json({ message: err.message });
            }
        }
    }

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
