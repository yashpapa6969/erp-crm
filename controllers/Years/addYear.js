const schemas = require("../../mongodb/schemas/schemas");

const addYears =  async (req, res) => {
    try {
      const yearData = req.body;
      const savedYears= await schemas.Year(yearData);
      const result = await savedYears.save();
      console.log(result);
  
      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

module.exports = addYears;

