const schemas = require("../../mongodb/schemas/schemas");

const addMessage =  async (req, res) => {
    try {
      const durationData = req.body;
      const savedDuration= await schemas.Uhl(durationData);
      const result = await savedDuration.save();
      console.log(result);
  
      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

module.exports = addMessage;
