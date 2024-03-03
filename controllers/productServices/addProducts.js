const schemas = require("../../mongodb/schemas/schemas");

const addProducts =  async (req, res) => {
    try {
      const productData = req.body;
      const savedProducts= await schemas.productServices(productData);
      const result = await savedProducts.save();
      console.log(result);
  
      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

module.exports = addProducts;

