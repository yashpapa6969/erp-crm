const schemas = require("../../mongodb/schemas/schemas");

getAllTags= async (req, res) => {
    try {
        const tags = await schemas.sourceTag.find({});
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllTags;
