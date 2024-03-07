const schemas = require("../../mongodb/schemas/schemas");


const deleteTagById = async (req, res) => {
  const tag_id = req.params.tag_id;

  try {
    const deletedTag= await schemas.Tag.findOne({tag_id:tag_id});

    if (!deletedTag) {
      return res.status(404).json({ message: "Tag not found." });
    }
    await schemas.Tag.deleteOne({tag_id});


    res.status(200).json({ message: "Tag deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  deleteTagById;


