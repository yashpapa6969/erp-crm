const schemas = require("../../mongodb/schemas/schemas");

getAllDuration= async (req, res) => {
    try {
        const duration= await schemas.Duration.find({});
        res.status(200).json(duration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllDuration;
