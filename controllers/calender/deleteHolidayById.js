const schemas = require("../../mongodb/schemas/schemas");

const deleteHolidayById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedHoliday = await schemas.Calendar.findOneAndDelete({calender_id:id});
        if (!deletedHoliday) {
            return res.status(404).json({ message: 'Holiday not found' });
        }

        res.status(200).json({ message: 'Holiday deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = deleteHolidayById;
