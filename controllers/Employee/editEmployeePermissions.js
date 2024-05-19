const schemas = require("../../mongodb/schemas/schemas");


const EditPermission = async (req, res) => {
    const employee_id = req.params.employee_id;
    const { permissions } = req.body;

    try {
        const employee = await schemas.Employee.findOne({employee_id:employee_id});
        
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        employee.permissions = permissions;

        await employee.save();

        res.status(200).json({ message: 'Permissions updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Export the router
module.exports = EditPermission;
