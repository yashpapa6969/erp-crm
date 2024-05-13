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
    const rec_id = req.params.rec_id;
  
    try {
      const deletedReceivable= await schemas.Receivable.findOne({rec_id:rec_id});
  
      if (!deletedReceivable) {
        return res.status(404).json({ message: "Receivable not found." });
      }
      await schemas.Receivable.deleteOne({rec_id});
  
  
      res.status(200).json({ message: "Receivable deleted successfully." });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
module.exports = { addReceivable, getAllReceivable, updateReceivable, deleteReceivable }

