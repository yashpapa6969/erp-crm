const bcrypt = require('bcrypt');
const schemas = require("../../mongodb/schemas/schemas");


async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

const updatePassword =async (req, res) => {
  const { employee_id, newPassword } = req.body;

  if (!employee_id || !newPassword) {
    return res.status(400).json({ message: "Employee ID and new password are required" });
  }

  try {
    const employeeExists = await schemas.Employee.exists({ employee_id: employee_id });

    if (!employeeExists) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await schemas.Employee.updateOne({ employee_id: employee_id }, { $set: { password: hashedPassword } });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Error updating password" });
  }
};


module.exports = updatePassword;
