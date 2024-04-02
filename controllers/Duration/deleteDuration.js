const schemas = require("../../mongodb/schemas/schemas");


const deleteDurationById = async (req, res) => {
  const duration_id = req.params.duration_id;

  try {
    const duration = await schemas.Year.findOne({duration_id:duration_id});

    if (!duration) {
      return res.status(404).json({ message: "duration not found." });
    }
    await schemas.Duration.deleteOne({duration});


    res.status(200).json({ message: "duration deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  deleteDurationById;

