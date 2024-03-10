const schemas = require("../../mongodb/schemas/schemas");

getAllInvoicesFilter = async (req, res) => {
    const { financialYear, month } = req.query; // Assuming you receive these as query parameters

    try {
        let startDate, endDate;
        if (month >= 4) { // For April to December, the start and end are within the same financial year
            startDate = new Date(financialYear, month - 1, 1); // Month is 0-indexed
            endDate = new Date(financialYear, month, 0); // Last day of the month
        } else { // For January to March, the financial year spans into the next calendar year
            startDate = new Date(financialYear - 1, month - 1, 1); // Month is 0-indexed, financial year starts previous calendar year
            endDate = new Date(financialYear - 1, month, 0); // Last day of the month
        }

        // Adjusted query to use the corrected startDate and endDate for filtering
        const slips = await schemas.Invoice.find({
            createdAt: { $gte: startDate, $lte: endDate }
        });

        res.status(200).json(slips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllInvoicesFilter;
