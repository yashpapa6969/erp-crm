const schemas = require("../../mongodb/schemas/schemas");


const deleteYearById = async (req, res) => {
  const year_id = req.params.year_id;

  try {
    const years = await schemas.Year.findOne({year_id:year_id});

    if (!years) {
      return res.status(404).json({ message: "Year not found." });
    }
    await schemas.Year.deleteOne({product_id});


    res.status(200).json({ message: "Year deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  deleteYearById;
