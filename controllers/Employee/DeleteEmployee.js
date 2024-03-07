const schemas = require("../../mongodb/schemas/schemas");


const deleteEmployeeById = async (req, res) => {
  const employee_id = req.params.employee_id;

  try {
    const deletedEmployee = await schemas.Employee.findOne({employee_id:employee_id});

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    await schemas.Employee.deleteOne({employee_id});


    res.status(200).json({ message: "Employee deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  deleteEmployeeById;
