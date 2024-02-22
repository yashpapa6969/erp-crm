const schemas = require("../../mongodb/schemas/schemas");
const sendEmail = require("../../middleware/mailingService")

   createProject = async (req, res) => {
    const {
        projectName,
        client_id,
        progress,
        billingType,
        status,
        totalRate,
        estimatedHours,
        startDate,
        endDate,
        tags,
        description,
        employees
    } = req.body;

    try {
        const newProject = new schemas.Project({
            projectName,
            client_id,
            progress,
            billingType,
            status,
            totalRate,
            estimatedHours,
            startDate,
            endDate,
            tags,
            description,
            employees
        });

       const project  = await newProject.save(); 

        await  notifyProjectStart(project.projectId, project.client_id, project.employees);

        res.status(201).json({ message: "Project successfully created!", project: newProject });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};





const notifyProjectStart = async (projectId, clientId, employeeIds) => {
    try {
      const client = await schemas.Client.find({client_id:clientId});
      if (!client) {
        console.error('Client not found');
        return;
      }
      const clientEmail = client.email;
      const clientName = client.name; 

      await sendEmail(
        clientEmail,
        "Project Start Notification",
        `Project Starting!`,
        `Your project with ID: ${projectId} is starting. We're excited to work with you!`
      );
  
      const employees = await schemas.Employee.find({ 'employee_id': { $in: employeeIds } });
  
      for (const employee of employees) {
        console.log('');

        await sendEmail(
          employee.email,
          "New Project Assignment",
          `You're Assigned to a New Project!`,
          `You have been assigned to a new project with ID: ${projectId}. Please check your tasks and start contributing!`
        );
      }
  
      console.log('Notification emails sent to client and employees.');
    } catch (error) {
      console.error('Failed to send notification emails:', error.message);
    }
  };


module.exports = createProject;
