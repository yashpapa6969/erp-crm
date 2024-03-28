const schemas = require("../../mongodb/schemas/schemas");

const addSupply =  async (req, res) => {
    try {
      const supplyData = req.body;
      const savedSupply= await schemas.supplyTag(supplyData);
      const result = await savedSupply.save();
      console.log(result);
  
      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

module.exports = addSupply ;
