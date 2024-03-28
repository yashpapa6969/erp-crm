const schemas = require("../../mongodb/schemas/schemas");


const deleteSupplyById = async (req, res) => {
  const supply_id = req.params.supply_id;

  try {
    const supply = await schemas.supplyTag.findOne({supply_id:supply_id});

    if (!supply) {
      return res.status(404).json({ message: "supply not found." });
    }
    await schemas.supplyTag.deleteOne({supply_id});


    res.status(200).json({ message: "supply deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  deleteSupplyById;
