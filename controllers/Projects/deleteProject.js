const schemas = require("../../mongodb/schemas/schemas");


const deleteProjectById = async (req, res) => {
  const project_id = req.params.project_id;

  try {
    const deletedProject= await schemas.Project.findOne({project_id:project_id});

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found." });
    }
    await schemas.Project.deleteOne({project_id});


    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  deleteProjectById;


