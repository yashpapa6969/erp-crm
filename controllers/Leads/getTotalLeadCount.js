const schemas = require("../../mongodb/schemas/schemas");

const getTotalLeadCount = async (req, res) => {
    const { financialYear, month, quarter } = req.params; 
    
    let query = {}; 

    const year = parseInt(financialYear, 10);

    if (financialYear && !isNaN(year)) {
        let startDate, endDate;

        try {
            if (month) {
                const monthInt = parseInt(month, 10);
                if (monthInt < 1 || monthInt > 12) {
                    return res.status(400).json({ message: 'Invalid month provided.' });
                }
                startDate = new Date(year, monthInt - 1, 1); 
                endDate = new Date(year, monthInt, 0); 
            } else if (quarter) {
                const quarterInt = parseInt(quarter, 10);
                if (quarterInt < 1 || quarterInt > 4) {
                    return res.status(400).json({ message: 'Invalid quarter provided.' });
                }
                startDate = new Date(year, (quarterInt - 1) * 3, 1);
                endDate = new Date(year, quarterInt * 3, 0);
            } else {
                startDate = new Date(year, 3, 1); // Start from April (Q1)
                endDate = new Date(year + 1, 2, 31); // End in March (Q4)
            }
            query.createdAt = { $gte: startDate, $lte: endDate };
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    try {
        const totalLeadCount = await schemas.Lead.countDocuments(query);
        res.json({ totalLeadCount });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = getTotalLeadCount;
