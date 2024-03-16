const schemas = require("../../mongodb/schemas/schemas");

const getAllLeaves = async (req, res) => {
  try {
    const allLeaves = await schemas.LeaveRequest.aggregate([
      {
        $lookup: {
          from: "employees", // Assuming the name of the employees collection is "employees"
          localField: "employee_id",
          foreignField: "employee_id",
          as: "employee"
        }
      },
      {
        $addFields: {
          employee_name: { $arrayElemAt: ["$employee.name", 0] }
        }
      },
      {
        $project: {
          employee: 0 // Exclude the employee field from the output
        }
      }
    ]);

    res.status(200).json({ success: true, data: allLeaves });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = getAllLeaves;
