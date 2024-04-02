const schemas = require("../../mongodb/schemas/schemas");

const addReceivable = async (req, res) => {
    try {
        const { clientName, brandName, companyName, totalAmount, amount, balanceDue } = req.body;
        const newReceivable = new schemas.Receivable({
            clientName,
            brandName,
            companyName,
            totalAmount,
            amount,
            balanceDue
        });
        const savedReceivable = await newReceivable.save();
        res.status(201).json(savedReceivable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllReceivable = async (req, res) => {
    try {
        const receivables = await schemas.Receivable.find();
        res.json(receivables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReceivable = async (req, res) => {
    try {
        const updatedReceivable = await schemas.Receivable.findOneAndUpdate(
            { rec_id: req.params.rec_id },
            req.body,
            { new: true }
        );
        res.json(updatedReceivable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const deleteReceivable = async (req, res) => {
    try {
        await schemas.Receivable.findByIdAndDelete({ rec_id: req.params.rec_id });
        res.json({ message: 'Receivable deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { addReceivable, getAllReceivable, updateReceivable, deleteReceivable }

