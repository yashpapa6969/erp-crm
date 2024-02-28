const schemas = require("../../mongodb/schemas/schemas");

const addTag =  async (req, res) => {
    try {
      const tagData = req.body;
      const savedTags= await schemas.sourceTag(tagData);
      const result = await savedTags.save();
      console.log(result);
  
      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

module.exports = addTag;
