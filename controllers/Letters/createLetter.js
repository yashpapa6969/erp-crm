const schemas = require("../../mongodb/schemas/schemas");

const createLetter = async (req, res) => {
    var {
        name,
        createdAt,
    } = req.body;

    const singleFile = req.files.singleFile ? req.files.singleFile[0] : null;
    if(!createdAt){
        createdAt = new Date()
    }
    try {
        const newLetter = new schemas.Letter({
            name,
            createdAt,
            singleFile: singleFile ? singleFile.filename : undefined,
        });

        const letter = await newLetter.save();

        res.status(201).json({
            message: "Letter successfully created!",
            letter
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = createLetter;
