const schemas = require("../../mongodb/schemas/schemas");

const getProjectCountsByBrand = async (req, res) => {
    try {
        const brandCounts = await schemas.Project.aggregate([
            { $group: { _id: "$brandName", count: { $sum: 1 } } },
            { $project: { _id: 0, brandName: "$_id", count: 1 } } 
        ]);
        res.json(brandCounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = getProjectCountsByBrand;
