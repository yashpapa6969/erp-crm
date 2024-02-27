const schemas = require("../../mongodb/schemas/schemas");

const getProjectsByBrandName = async (req, res) => {
    const { brandName } = req.body;

    try {
        const projects = await schemas.Project.find({ brandName: brandName });
        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: "Projects not found" });
        }

        const employeeIds = [...new Set(projects.flatMap(project => project.employees))];
        const employees = await schemas.Employee.find({
            'employee_id': { $in: employeeIds }
        }).select('employee_id name'); // Make sure this matches your schema

        const projectsWithEmployeeDetails = projects.map(project => ({
            ...project.toObject(),
            employees: project.employees.map(employeeId => 
                employees.find(e => e.employee_id.toString() === employeeId.toString())
            ).filter(e => e)
        }));

        res.status(200).json(projectsWithEmployeeDetails);
    } catch (error) {
        console.error(error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid project brandName" });
        }
        res.status(500).json({ message: error.message });
    }
};
module.exports =getProjectsByBrandName
