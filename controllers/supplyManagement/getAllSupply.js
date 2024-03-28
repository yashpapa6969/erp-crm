const schemas = require("../../mongodb/schemas/schemas");

getAllSupplys= async (req, res) => {
    try {
        const supply= await schemas.supplyTag.find({});
        res.status(200).json(supply);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllSupplys;
