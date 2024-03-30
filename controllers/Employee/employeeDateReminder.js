const schemas = require("../../mongodb/schemas/schemas");
const moment = require('moment');

const isWithinNext30Days = (eventDate) => {
    const today = moment().startOf('day');
    const thirtyDaysLater = moment().add(30, 'days').endOf('day');
    return eventDate.isBetween(today, thirtyDaysLater, null, '[]');
};

const filterEmployeeBySpecialDates = (employees) => {
    return employees.map(employee => {
        let upcomingEvents = [];
        
        // Convert to Moment objects to ensure comparison handles year transitions
        let joiningDate = moment(employee.joiningDate, 'DD-MM-YY');
        let dob = moment(employee.dob, 'DD-MM-YY');

        // Adjust the year for comparison to handle year transition
        // We only adjust months and days, ignoring years, to find upcoming events
        joiningDate.year(moment().year());
        if (joiningDate.isBefore(moment())) {
            joiningDate.add(1, 'year'); // Adjust to next year if the date this year has already passed
        }
        if (isWithinNext30Days(joiningDate)) {
            upcomingEvents.push('joiningDate');
        }

        dob.year(moment().year());
        if (dob.isBefore(moment())) {
            dob.add(1, 'year'); // Adjust to next year if the birthday this year has already passed
        }
        if (isWithinNext30Days(dob)) {
            upcomingEvents.push('dob');
        }

        if (upcomingEvents.length > 0) {
            return { ...employee._doc, upcomingEvents };
        } else {
            return null;
        }
    }).filter(employee => employee !== null);
};

const EmployeespecialDates = async (req, res) => {
    try {
        const employees = await schemas.Employee.find();

        const employeesWithUpcomingSpecialDates = filterEmployeeBySpecialDates(employees);

        res.json(employeesWithUpcomingSpecialDates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = EmployeespecialDates;
