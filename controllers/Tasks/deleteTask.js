const schemas = require("../../mongodb/schemas/schemas");


const deleteTaskById = async (req, res) => {
  const task_id = req.params.task_id;

  try {
    const deletedTask = await schemas.Task.findOne({task_id:task_id});

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found." });
    }
    await schemas.Task.deleteOne({task_id});


    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  deleteTaskById;


