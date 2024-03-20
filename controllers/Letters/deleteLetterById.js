const schemas = require("../../mongodb/schemas/schemas");

const deleteLetterById = async (req, res) => {
  try {
    const letterId = req.params.letter_id;
    const deletedLetter = await schemas.Letter.findOneAndDelete({ letter_id: letterId });
    if (!deletedLetter) {
      return res.status(404).json({ success: false, error: "Letter not found" });
    }
    res.status(200).json({ success: true, data: deletedLetter, message: "Letter deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = deleteLetterById;
