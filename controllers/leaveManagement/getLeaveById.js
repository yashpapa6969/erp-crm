const schemas = require("../../mongodb/schemas/schemas");

const getLeaveById = async (req, res) => {
    try {
        // Extract the leave ID from the request parameters
        const leaveId = req.params.leave_id;

        // Fetch the leave request by ID from the database
        const leave = await schemas.LeaveRequest.aggregate([
            {
                $match: {
                    leave_id: leaveId
                }
            },
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



        // If leave with the given ID is not found, return a 404 response
        if (!leave) {
            return res.status(404).json({ success: false, error: "Leave not found" });
        }

        // Respond with the leave request data
        res.status(200).json({ success: true, data: leave });
    } catch (err) {
        // If an error occurs, respond with an error message
        res.status(400).json({ success: false, error: err.message });
    }
};

module.exports = getLeaveById;
