const schemas = require("../../mongodb/schemas/schemas");


const deleteInvoiceById = async (req, res) => {
  const invoice_id = req.params.invoice_id;

  try {
    const deletedInvoice= await schemas.Invoice.findOne({invoice_id:invoice_id});

    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found." });
    }
    await schemas.Invoice.deleteOne({invoice_id});


    res.status(200).json({ message: "Invoice deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  deleteInvoiceById;

