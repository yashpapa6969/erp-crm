
const schemas = require("../../mongodb/schemas/schemas");

const getLetterById = async (req, res) => {
    const { letter_id} = req.params; 
    try {
        const letter = await schemas.Letter.findOne({ letter_id: letter_id});
        if (!letter) {
            return res.status(404).json({ message: "Letter not found" });
        }
        res.status(200).json(letter);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid Letter ID" });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = getLetterById;
