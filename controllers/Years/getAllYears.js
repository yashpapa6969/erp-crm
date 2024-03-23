const schemas = require("../../mongodb/schemas/schemas");

getAllYears= async (req, res) => {
    try {
        const years= await schemas.Year.find({});
        res.status(200).json(years);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllYears;
