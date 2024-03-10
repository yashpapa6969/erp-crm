const schemas = require("../../mongodb/schemas/schemas");

getAllInvoicesFilter = async (req, res) => {
    const { financialYear, month } = req.params; // Extracting year and month from route parameters

    // Parsing financialYear to an integer for validation and calculations
    const year = parseInt(financialYear, 10);
    let startDate, endDate;

    // Validate the financialYear is a number
    if (!financialYear || isNaN(year)) {
        return res.status(400).json({ message: 'Invalid financialYear provided.' });
    }

    // Determine the date range based on the provided parameters
    try {
        if (month) {
            // If month is provided, parse it and show invoices for that specific month of the year
            const monthInt = parseInt(month, 10);
            startDate = new Date(year, monthInt - 1, 1); // JS Date object months are 0-indexed
            endDate = new Date(year, monthInt, 0); // This will get the last day of the provided month
        } else {
            // If only year is provided, show invoices for the entire financial year
            // Assuming the financial year starts in April and ends in March of the next year
            startDate = new Date(year, 3, 1); // April 1st of the provided year
            endDate = new Date(year + 1, 2, 31); // March 31st of the next year
        }

        // Fetching invoices within the specified date range
        const slips = await schemas.Invoice.find({
            createdAt: { $gte: startDate, $lte: endDate }
        });

        res.status(200).json(slips);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllInvoicesFilter;
