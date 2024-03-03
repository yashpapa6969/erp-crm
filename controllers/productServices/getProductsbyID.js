const schemas = require("../../mongodb/schemas/schemas");

const getProductDetails = async (req, res) => {
    const { product_id } = req.params; 

    try {
        const tags = await schemas.productServices.findOne({ product_id: product_id });
        if (!tags) {
            return res.status(404).json({ message: "product_id not found" });
        }
        res.status(200).json(tags);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "product  ID" });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = getProductDetails;
