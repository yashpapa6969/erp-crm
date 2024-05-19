const schemas = require("../../mongodb/schemas/schemas");

getAllProducts= async (req, res) => {    
    try {
        const products = await schemas.productServices.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllProducts;
