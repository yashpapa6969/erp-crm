
const schemas = require("../../mongodb/schemas/schemas");
const fs = require('fs');
const path = require('path');

const updateLetter = async (req, res) => {
  const { letter_id } = req.params;
  let { singleFileToRemove, createdAt, ...updateBody } = req.body;
  try {
    // Check if the client exists
    const existingLetter = await schemas.Letter.findOne({ letter_id: letter_id});
    if (!existingLetter) {
      return res.status(404).send({ message: 'Letter not found' });
    }

    if (createdAt) {
      createdAt = createdAt;
    }
    else {
      createdAt = existingLetter.createdAt;
    }

    // Delete single file if specified
    if (singleFileToRemove != null && typeof singleFileToRemove === 'string') {
      const singleFilePath = path.join(__dirname, '../../uploads', singleFileToRemove);
      if (fs.existsSync(singleFilePath)) {
        console.log("Single file exists. Deleting...");
        fs.unlinkSync(singleFilePath);
        console.log("Single file deleted successfully.");

        // Remove single file from the database
        await schemas.Letter.findOneAndUpdate(
          { letter_id: letter_id},
          { $unset: { singleFile: "" } }
        );
      } else {
        console.log("Single file does not exist.");
      }
    }

    const singleFile = req.files.singleFile ? req.files.singleFile[0] : null;

    // Update client document in the database
    const updatedLetter = await schemas.Letter.findOneAndUpdate(
      { letter_id: letter_id },
      {
        ...updateBody,
        singleFile: singleFile ? singleFile.filename : undefined,
       createdAt 
      },
      { new: true }
    );

    res.status(200).json({
      message: "Letter successfully updated!",
      letter :updatedLetter 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = updateLetter;
