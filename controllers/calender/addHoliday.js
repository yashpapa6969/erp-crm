const schemas = require("../../mongodb/schemas/schemas");

const addHoliday = async (req, res) => {
    try {
        const holidayData = req.body;

        if (!holidayData || typeof holidayData !== 'object') {
            return res.status(400).json({ message: 'Invalid holiday data' });
        }
        if (typeof holidayData.client_id !== 'string' || !holidayData.client_id.trim()) {
            return res.status(400).json({ message: 'Invalid client ID' });
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

        const newHoliday = new schemas.Calendar(holidayData);
        const savedHoliday = await newHoliday.save();
        res.status(200).json({ savedHoliday });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = addHoliday;
