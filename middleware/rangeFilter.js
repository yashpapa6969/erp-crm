
const buildDateRangeQuery = (financialYear, month, quarter, firstQuarterMonth) => {
    let query = {};
    let startDate, endDate;

    if (!firstQuarterMonth) {
        throw new Error('First quarter month is required.');
    }

    const year = parseInt(financialYear, 10);
    const firstQMonth = parseInt(firstQuarterMonth, 10) - 1;

    if (isNaN(year) || isNaN(firstQMonth) || firstQMonth < 0 || firstQMonth > 11) {
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
    } else {
        startDate = new Date(year, firstQMonth, 1);
        const endMonth = (firstQMonth + 12) % 12;
        const endYear = firstQMonth + 12 > 11 ? year + 1 : year;
        endDate = new Date(endYear, endMonth, 0);
    }

    query.createdAt = { $gte: startDate, $lte: endDate };
    return query;
};

module.exports = { buildDateRangeQuery };
