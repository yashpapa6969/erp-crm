const schemas = require("../../mongodb/schemas/schemas");

getAllMessages= async (req, res) => {
    try {
        const duration= await schemas.Uhl.find({});
        res.status(200).json(duration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllMessages;
