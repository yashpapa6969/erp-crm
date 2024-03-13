const schemas = require("../../mongodb/schemas/schemas");
const fs = require('fs');
const path = require('path');

const updateClient = async (req, res) => {
  const { client_id } = req.params;
  let { singleFileToRemove, multipleFilesToRemove, ...updateBody } = req.body;
  try {
    // Check if the client exists
    const existingClient = await schemas.Client.findOne({ client_id: client_id });
    if (!existingClient) {
      return res.status(404).send({ message: 'Client not found' });
    }


    // Delete single file if specified
    if (singleFileToRemove != null && typeof singleFileToRemove === 'string') {
      const singleFilePath = path.join(__dirname, '../../uploads', singleFileToRemove);
      if (fs.existsSync(singleFilePath)) {
        console.log("Single file exists. Deleting...");
        fs.unlinkSync(singleFilePath);
        console.log("Single file deleted successfully.");

        // Remove single file from the database
        await schemas.Client.findOneAndUpdate(
          { client_id: client_id },
          { $unset: { singleFile: "" } }
        );
      } else {
        console.log("Single file does not exist.");
      }
    }

    // Delete multiple files if specified
    // Get the existing multiple files from the database
    const existingMultipleFiles = existingClient.multipleFiles || [];
    if (multipleFilesToRemove && Array.isArray(multipleFilesToRemove)) {
      // Array to store promises for database updates
      const dbUpdatePromises = [];

      for (const filename of multipleFilesToRemove) {
        const multipleFilePath = path.join(__dirname, '../../uploads', filename);
        if (fs.existsSync(multipleFilePath)) {
          console.log("Multiple file exists. Deleting...");
          fs.unlinkSync(multipleFilePath);
          console.log("Multiple file deleted successfully.");

          // Remove filename from existingMultipleFiles
          const index = existingMultipleFiles.indexOf(filename);
          if (index !== -1) {
            existingMultipleFiles.splice(index, 1);
          }

          // Push the update operation promise
          dbUpdatePromises.push(
            schemas.Client.findOneAndUpdate(
              { client_id: client_id },
              { $pull: { multipleFiles: filename } }
            )
          );
        } else {
          console.log("Multiple file does not exist.");
        }
      }

      // Wait for all database update operations to complete
      await Promise.all(dbUpdatePromises);
    }


    const singleFile = req.files.singleFile ? req.files.singleFile[0] : existingClient.singleFile;
    // Combine existing and new multiple files
    const allMultipleFiles = [...existingMultipleFiles, ...(req.files.multipleFiles || []).map(file => file.filename)];

    // Update client document in the database
    const updatedClient = await schemas.Client.findOneAndUpdate(
      { client_id: client_id },
      {
        ...updateBody,
        singleFile: singleFile ? singleFile.filename : undefined,
        multipleFiles: allMultipleFiles
      },
      { new: true }
    );

    res.status(200).json({
      message: "Client successfully updated!",
      client: updatedClient
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = updateClient;
