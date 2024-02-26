const schemas = require("../../mongodb/schemas/schemas");

const getTagsDetails = async (req, res) => {
    const { tag_id } = req.params; 

    try {
        const tags = await schemas.Tag.findOne({ tag_id: tag_id });
        if (!tags) {
            return res.status(404).json({ message: "tags not found" });
        }
        res.status(200).json(tags);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid tag ID" });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = getTagsDetails;
