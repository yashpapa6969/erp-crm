const schemas = require("../../mongodb/schemas/schemas");

const getHolidays = async (req, res) => {
    try {
        const holidays = await schemas.Calendar.find();
        res.status(200).json({ holidays });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


module.exports =  getHolidays;
