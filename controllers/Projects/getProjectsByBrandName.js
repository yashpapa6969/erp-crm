const schemas = require("../../mongodb/schemas/schemas");

const getProjectsByBrandName= async (req, res) => {
    const { brandName } = req.params; 

    try {
        const projects = await schemas.Project.find({ brandName: brandName });
        if (!projects) {
            return res.status(404).json({ message: "projects not found" });
        }
        res.status(200).json(projects);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid project brandName" });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = getProjectsByBrandName;
