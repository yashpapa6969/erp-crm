const schemas = require("../../mongodb/schemas/schemas");
const fs = require('fs');
const path = require('path');

const updateLead = async (req, res) => {
  const { lead_id } = req.params;
  let { singleFileToRemove, multipleFilesToRemove, enquiryDate, ...updateBody } = req.body;
  const convertDateFormat = (dateString) => {
    if (!dateString) return dateString; // If dateString is null or undefined, return it as is
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear().toString().slice(-2);

    return `${day}-${month}-${year}`;
  };
  try {
    // Check if the client exists
    const existingLead = await schemas.Lead.findOne({ lead_id: lead_id });
    if (!existingLead) {
      return res.status(404).send({ message: 'Lead not found' });
    }

    if (enquiryDate) {
      enquiryDate = convertDateFormat(enquiryDate);
    }
    else {
      enquiryDate = existingClient.enquiryDate;
    }

    // Delete single file if specified
    if (singleFileToRemove != null && typeof singleFileToRemove === 'string') {
      const singleFilePath = path.join(__dirname, '../../uploads', singleFileToRemove);
      if (fs.existsSync(singleFilePath)) {
        console.log("Single file exists. Deleting...");
        fs.unlinkSync(singleFilePath);
        console.log("Single file deleted successfully.");

        // Remove single file from the database
        await schemas.Lead.findOneAndUpdate(
          { lead_id: lead_id },
          { $unset: { singleFile: "" } }
        );
      } else {
        console.log("Single file does not exist.");
      }
    }

    // Delete multiple files if specified
    // Get the existing multiple files from the database
    const existingMultipleFiles = existingLead.multipleFiles || [];
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
            schemas.Lead.findOneAndUpdate(
              { lead_id: lead_id },
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


    const singleFile = req.files.singleFile ? req.files.singleFile[0] : existingLead.singleFile;
    // Combine existing and new multiple files
    const allMultipleFiles = [...existingMultipleFiles, ...(req.files.multipleFiles || []).map(file => file.filename)];

    // Update client document in the database
    const updatedLead = await schemas.Lead.findOneAndUpdate(
      { lead_id: lead_id },
      {
        ...updateBody,
        singleFile: singleFile ? singleFile.filename : undefined,
        multipleFiles: allMultipleFiles,
        enquiryDate
      },
      { new: true }
    );

    res.status(200).json({
      message: "Lead successfully updated!",
      lead: updatedLead
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = updateLead;
