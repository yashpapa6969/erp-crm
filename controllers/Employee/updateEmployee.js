
const schemas = require("../../mongodb/schemas/schemas");
const fs = require('fs');
const path = require('path');

const updateEmployee = async (req, res) => {
  const { employee_id } = req.params; // Assuming employee_id is used to identify the employee to update
  let { singleFileToRemove, multipleFilesToRemove, ...updateBody } = req.body;
  
  try {
    const existingEmployee = await schemas.Employee.findOne({ employee_id: employee_id });
    if (!existingEmployee) {
      return res.status(404).send({ message: 'Employee not found' });
    }

    if (singleFileToRemove != null && typeof singleFileToRemove === 'string') {
      const singleFilePath = path.join(__dirname, '../../uploads', singleFileToRemove);
      if (fs.existsSync(singleFilePath)) {
        console.log("Single file exists. Deleting...");
        fs.unlinkSync(singleFilePath);
        console.log("Single file deleted successfully.");
        
        await schemas.Employee.findOneAndUpdate(
          { employee_id: employee_id },
          { $unset: { singleFile: "" } }
        );
      } else {
        console.log("Single file does not exist.");
      }
    }

    const existingMultipleFiles = existingEmployee.multipleFiles || [];
    if (multipleFilesToRemove && Array.isArray(multipleFilesToRemove)) {
      const dbUpdatePromises = multipleFilesToRemove.map(filename => {
        const multipleFilePath = path.join(__dirname, '../../uploads', filename);
        if (fs.existsSync(multipleFilePath)) {
          console.log("Multiple file exists. Deleting...");
          fs.unlinkSync(multipleFilePath);
          console.log("Multiple file deleted successfully.");
          return schemas.Employee.findOneAndUpdate(
            { employee_id: employee_id },
            { $pull: { multipleFiles: filename } }
          );
        }
        return Promise.resolve();
      });

      await Promise.all(dbUpdatePromises);
    }

    const updatedEmployee = await schemas.Employee.findOneAndUpdate(
      { employee_id: employee_id },
      { ...updateBody },
      { new: true }
    );

    res.status(200).json({
      message: "Employee successfully updated!",
      employee: updatedEmployee
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = updateEmployee;
