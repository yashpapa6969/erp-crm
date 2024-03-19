const schemas = require("../../mongodb/schemas/schemas");

getAllLetters= async (req, res) => {
    try {
        const letters = await schemas.Letter.find({});
        res.status(200).json(letters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllLetters;
