const schemas = require("../../mongodb/schemas/schemas");


const deleteProductById = async (req, res) => {
  const product_id = req.params.product_id;

  try {
    const deletedProduct = await schemas.productServices.findOne({product_id:product_id});

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    await schemas.productServices.deleteOne({product_id});


    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  deleteProductById;

