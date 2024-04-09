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

        // Format the date to DD-MM-YY
        const dateParts = holidayData.date.split('-');
        const formattedDate = `${dateParts[2].slice(-2)}-${dateParts[1]}-${dateParts[0].slice(-2)}`;
        holidayData.date = formattedDate;

        const newHoliday = new schemas.Calendar(holidayData);
        const savedHoliday = await newHoliday.save();
        res.status(200).json({ savedHoliday });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = addHoliday;
