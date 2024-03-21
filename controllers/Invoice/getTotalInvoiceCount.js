const schemas = require("../../mongodb/schemas/schemas");

const getTotalInvoiceCount = async (req, res) => {
    const { financialYear, month } = req.params; 
    
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
            } else {
        
                startDate = new Date(year, 3, 1); 
                endDate = new Date(year + 1, 2, 31); 
            }
            query.createdAt = { $gte: startDate, $lte: endDate };
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    try {
        const totalInvoiceCount = await schemas.Invoice.countDocuments(query);
        res.json({ totalInvoiceCount });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = getTotalInvoiceCount;





