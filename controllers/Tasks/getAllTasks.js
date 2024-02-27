const schemas = require("../../mongodb/schemas/schemas");

getAllTasks= async (req, res) => {
    try {
        const tags = await schemas.Task.find({});
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllTasks;
