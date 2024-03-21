const schemas = require("../../mongodb/schemas/schemas");
const moment = require('moment');

const isWithinNext30Days = (eventDate) => {
    const today = moment().startOf('day');
    const thirtyDaysLater = moment().add(30, 'days').endOf('day');
    return eventDate.isBetween(today, thirtyDaysLater, null, '[]');
};

const filterClientsBySpecialDates = (clients) => {
    return clients.map(client => {
        let upcomingEvents = [];

        // For each special date, adjust the year for comparison
        ['clientBirthday', 'clientAnniversary', 'workStartDate', 'companyAnniversary'].forEach(event => {
            let eventDate = moment(client[event], 'DD-MM-YY');
            eventDate.year(moment().year()); // Set to current year for comparison
            if (eventDate.isBefore(moment())) {
                eventDate.add(1, 'year'); // If the date has passed this year, move to next year
            }
            if (isWithinNext30Days(eventDate)) {
                upcomingEvents.push(event);
            }
        });

        if (upcomingEvents.length > 0) {
            return { ...client._doc, upcomingEvents };
        } else {
            return null;
        }
    }).filter(client => client !== null);
};

const specialDates = async (req, res) => {
    try {
        const clients = await schemas.Client.find();
        const clientsWithUpcomingSpecialDates = filterClientsBySpecialDates(clients);
        res.json(clientsWithUpcomingSpecialDates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = specialDates;
