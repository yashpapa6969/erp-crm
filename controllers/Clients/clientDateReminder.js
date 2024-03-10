const schemas = require("../../mongodb/schemas/schemas");
const moment = require('moment'); 
const convertToDateObject = (dateStr) => {
    return moment(dateStr, 'DD-MM-YY').toDate();
};

const isWithinNext30Days = (date) => {
    const today = moment().startOf('day'); 
    const thirtyDaysLater = moment().add(30, 'days').endOf('day'); 
    return date.isBetween(today, thirtyDaysLater, null, '[]'); 
};


const filterClientsBySpecialDates = (clients) => {
    return clients.map(client => {
        let upcomingEvents = [];

        if (isWithinNext30Days(moment(client.clientBirthday, 'DD-MM-YY'))) {
            upcomingEvents.push('clientBirthday');
        }
        if (isWithinNext30Days(moment(client.clientAnniversary, 'DD-MM-YY'))) {
            upcomingEvents.push('clientAnniversary');
        }
        if (isWithinNext30Days(moment(client.workStartDate, 'DD-MM-YY'))) {
            upcomingEvents.push('workStartDate');
        }
        if (isWithinNext30Days(moment(client.companyAnniversary, 'DD-MM-YY'))) {
            upcomingEvents.push('companyAnniversary');
        }

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
module.exports  = specialDates
