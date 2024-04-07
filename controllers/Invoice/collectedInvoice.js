const schemas = require("../../mongodb/schemas/schemas");

const collectedInvoice = async (req, res) => {
  try {
    const { invoice_id } = req.params;
    const { amountCollected } = req.body;

    if (!amountCollected) {
      return res.status(400).send({ message: 'Amount collected is required.' });
    }

    const invoice = await schemas.Invoice.findOneAndUpdate(
      { invoice_id: invoice_id },
      {
        $push: { collectionHistory: { amountCollected: parseFloat(amountCollected) } },
        $inc: { totalCollected: parseFloat(amountCollected) }
      },
      { new: true } 
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
        brandName: client.brandName, 
        clientName: client.clientName, 
        client_id: invoice.client_id,
        description: `Collection for invoice ${invoice_id} ${invoice.description}`,
        received:amountCollected,
      });
      await newLedgerEntry.save();
    }
    const existingReceivable = await schemas.Receivable.findOne({
      clientName: client.clientName, 
      brandName: invoice.brandName
    });

    if (existingReceivable) {
      existingReceivable.balanceDue = parseFloat(existingReceivable.totalAmount) - parseFloat(amountCollected);
    
    } else {
      const newReceivable = new schemas.Receivable({
        client_id:client.client_id,
        clientName: client.clientName,
        brandName: invoice.brandName,
        companyName: client.companyName, 
        totalAmount: parseFloat(invoice.total),
        amount: parseFloat(totalBeforeGST),
        balanceDue: parseFloat(amountCollected) 
      });
      await newReceivable.save();
    }
  


    res.status(200).send(invoice);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = collectedInvoice;
