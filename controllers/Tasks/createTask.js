const schemas = require("../../mongodb/schemas/schemas");

const addTask =  async (req, res) => {
    try {
      const taskData = req.body;
      const savedTask= await schemas.Task(taskData);
      const result = await savedTask.save();
      console.log(result);
  
      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

module.exports = addTask;
