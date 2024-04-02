const schemas = require("../../mongodb/schemas/schemas");

const collectedInvoice = async (req, res) => {
  try {
    const { invoice_id } = req.params;
    const { amountCollected } = req.body;

    if (!amountCollected) {
      return res.status(400).send({ message: 'Amount collected is required.' });
    }

    // Update the invoice and add to its collection history
    const invoice = await schemas.Invoice.findOneAndUpdate(
      { invoice_id: invoice_id },
      {
        $push: { collectionHistory: { amountCollected: parseFloat(amountCollected) } },
        $inc: { totalCollected: parseFloat(amountCollected) }
      },
      { new: true } // Returns the modified document
    );

    if (!invoice) {
      return res.status(404).send({ message: 'Invoice not found.' });
    }

   
    if (invoice.totalCollected >= invoice.total) {
      await schemas.Invoice.updateOne({ invoice_id: invoice_id }, { $set: { paid: true } });
      invoice.paid = true;
    }
    const client = await schemas.Client.findOne({ client_id: invoice.client_id });
    if (!client) {
      return res.status(404).send({ message: 'Client not found.' });
    }
    if (invoice.billType === 'cash') {
      const newLedgerEntry = new schemas.Ledger({
        companyName: client.companyName, 
        brandName: companyName.brandName, 
        clientName: companyName.clientName, 
        client_id: invoice.client_id,
        description: `Collection for invoice ${invoice_id} ${invoice.description}`,
        received:amountCollected,
      });
      await newLedgerEntry.save();
    }

    res.status(200).send(invoice);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = collectedInvoice;
