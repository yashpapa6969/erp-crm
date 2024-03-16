const schemas = require("../../mongodb/schemas/schemas");
const sendEmail = require("../../middleware/mailingService")

const addTask =  async (req, res) => {
    try {
      const taskData = req.body;
      const savedTask= await schemas.Task(taskData);
      const convertDateFormat = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return dateString; // Return original if parsing fails
        }
        let day = date.getUTCDate().toString().padStart(2, '0'); // Using getUTCDate to avoid timezone issues
        let month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed, using getUTCMonth
        let year = date.getUTCFullYear().toString().slice(-2);
    
        return `${day}-${month}-${year}`;
    };
    savedTask.startDate = convertDateFormat(savedTask.startDate);
    savedTask.deadline = convertDateFormat(savedTask.deadline);
      const result = await savedTask.save();
      console.log(result);
      const employee = await schemas.Employee.findOne({ employee_id: result.employee_id });
      const emailSubject = `Your Tasks `;
      
      const emailHtmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Task Notification</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 20px;
                  background-color: #f4f4f4;
              }
              .container {
                  background-color: #fff;
                  padding: 20px;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  color: #333;
              }
              p {
                  color: #666;
              }
              .task-detail {
                  margin-top: 20px;
              }
              .task-detail dt {
                  font-weight: bold;
              }
              .task-detail dd {
                  margin: 0 0 10px 0;
                  color: #333;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Task Notification</h1>
              <p>You have a new task update:</p>
              <dl class="task-detail">
                  <dt>Task ID:</dt>
                  <dd>${result.task_id}</dd>
                  <dt>Brand Name:</dt>
                  <dd>${result.brandName}</dd>
                  <dt>Priority:</dt>
                  <dd>${result.priority}</dd>
                  <dt>Status:</dt>
                  <dd>${result.status}</dd>
                  <dt>Start Date:</dt>
                  <dd>${result.startDate}</dd>
                  <dt>Deadline:</dt>
                  <dd>${result.deadline}</dd>
                  <dt>Description:</dt>
                  <dd>${result.description}</dd>
              </dl>
              <p>Please check your task dashboard for more details.</p>
          </div>
      </body>
      </html>
      
      `;
      
      if (employee.email) {
        await sendEmail(employee.email, emailSubject, "", emailHtmlContent);
      }
            
      res.status(200).json({ result });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

module.exports = addTask;
 