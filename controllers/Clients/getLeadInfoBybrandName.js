const schemas = require("../../mongodb/schemas/schemas");

getLeadByBrandName= async (req, res) => {
    try {
const {brandName} = req.body
        const clients = await schemas.Lead.find({brandName:brandName});
        res.status(200).json(clients);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

module.exports = getLeadByBrandName;
