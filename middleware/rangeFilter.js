// utils/dateFilter.js

/**
 * Builds a MongoDB query object for filtering documents by a date range.
 * The date range is determined by the financial year, month, quarter, and the first month of the first quarter.
 * 
 * @param {string} [financialYear] - The financial year to filter by (optional).
 * @param {string} [month] - The month to filter by (optional).
 * @param {string} [quarter] - The quarter to filter by (optional).
 * @param {string} [firstQuarterMonth] - The first month of the first quarter (optional).
 * @returns {Object} The MongoDB query object with the date range.
 * @throws {Error} If any input is invalid.
 */
const buildDateRangeQuery = (financialYear, month, quarter, firstQuarterMonth) => {
    let query = {};  // Initialize an empty query object
    let startDate, endDate;

    if (!financialYear && !month && !quarter) {
        // No filtering parameters provided, return an empty query to match all documents
        return query;
    }

    const year = financialYear ? parseInt(financialYear, 10) : null;
    const firstQMonth = firstQuarterMonth ? parseInt(firstQuarterMonth, 10) - 1 : 3;  // Default to April if not provided

    if ((financialYear && isNaN(year)) || (firstQuarterMonth && (isNaN(firstQMonth) || firstQMonth < 0 || firstQMonth > 11))) {
        throw new Error('Invalid financial year or first quarter month.');
    }

    if (month) {
        const monthInt = parseInt(month, 10) - 1;
        if (isNaN(monthInt) || monthInt < 0 || monthInt > 11) {
            throw new Error('Invalid month provided.');
        }
        startDate = new Date(year, monthInt, 1);
        endDate = new Date(year, monthInt + 1, 0);
    } else if (quarter) {
        const quarterInt = parseInt(quarter, 10);
        if (isNaN(quarterInt) || quarterInt < 1 || quarterInt > 4) {
            throw new Error('Invalid quarter provided.');
        }
        const startMonth = (firstQMonth + (quarterInt - 1) * 3) % 12;
        const startYear = year + Math.floor((firstQMonth + (quarterInt - 1) * 3) / 12);
        startDate = new Date(startYear, startMonth, 1);
        const endMonth = (startMonth + 3) % 12;
        const endYear = startMonth + 3 > 11 ? startYear + 1 : startYear;
        endDate = new Date(endYear, endMonth, 0);
    } else if (financialYear) {
        startDate = new Date(year, firstQMonth, 1);
        const endMonth = (firstQMonth + 12) % 12;
        const endYear = firstQMonth + 12 > 11 ? year + 1 : year;
        endDate = new Date(endYear, endMonth, 0);
    }

    if (startDate && endDate) {
        query.createdAt = { $gte: startDate, $lte: endDate };
    }

    return query;
};

module.exports = { buildDateRangeQuery };
