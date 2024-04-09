const schemas = require("../../mongodb/schemas/schemas");

const addHoliday = async (req, res) => {
    try {
        const holidayData = req.body;

        if (!holidayData || typeof holidayData !== 'object') {
            return res.status(400).json({ message: 'Invalid holiday data' });
        }
      
        if (typeof holidayData.title !== 'string' || !holidayData.title.trim()) {
            return res.status(400).json({ message: 'Invalid holiday title' });
        }
        if (typeof holidayData.date !== 'string' || !holidayData.date.trim()) {
            return res.status(400).json({ message: 'Invalid holiday date' });
        }
        if (!['company', 'festive', 'other'].includes(holidayData.type)) {
            return res.status(400).json({ message: 'Invalid holiday type' });
        }
console.log(req.body.date)
const convertDateFormat = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return dateString; 
    }
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    let year = date.getFullYear().toString().slice(-2);

    return `${day}-${month}-${year}`;
};
const holidaydate  = convertDateFormat(holidayData.date)
        holidayData.date = holidaydate;

        const newHoliday = new schemas.Calendar(holidayData);
        const savedHoliday = await newHoliday.save();
        res.status(200).json({ savedHoliday });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = addHoliday;
