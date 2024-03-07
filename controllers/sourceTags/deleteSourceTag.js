const schemas = require("../../mongodb/schemas/schemas");


const deleteSourceTagById = async (req, res) => {
  const source_tag_id = req.params.source_tag_id;

  try {
    const deletedTag = await schemas.sourceTag.findOne({source_tag_id:source_tag_id});

    if (!deletedTag) {
      return res.status(404).json({ message: "Tag not found." });
    }
    await schemas.sourceTag.deleteOne({source_tag_id});


    res.status(200).json({ message: "Tag deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  deleteSourceTagById;





