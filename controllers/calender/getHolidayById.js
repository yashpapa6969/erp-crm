const schemas = require("../../mongodb/schemas/schemas");

const getHolidayById = async (req, res) => {
    try {
        const { id } = req.params;
        const holiday = await schemas.Calendar.findOne({ calender_id: id });
        if (!holiday) {
            return res.status(404).json({ message: 'Holiday not found' });
        }
        res.status(200).json({ holiday });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports =  getHolidayById;
