const schemas = require("../../mongodb/schemas/schemas");

const addLedger = async (req, res) => {
    try {
        const { companyName, brandName, clientName, client_id, employee_id, description, received,paid} = req.body;
        const newEntry = new schemas.Ledger({
            companyName,
            brandName,
            clientName,
            client_id,
            employee_id,
            description,
            received,
            paid,
        });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllLedgers= async (req, res) => {
    try {
        const entries = await schemas.Ledger.find();
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getLeadgerbyLedgerId = async (req, res) => {
    try {
        const entry = await Ledger.findOne({ ledger_id: req.params.ledger_id });
        if (entry) {
            res.json(entry);
        } else {
            res.status(404).json({ message: 'Entry not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 const getLeadgerByClientId=async (req, res) => {
    try {
        const entries = await schemas.Ledger.find({ client_id: req.params.client_id });
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getLeadgerbyEmployeeId = async (req, res) => {
    try {
        const entries = await schemas.Ledger.find({ employee_id: req.params.employeeId });
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const ledgerStatistics = async (req, res) => {
    try {
        const totalPaid = await schemas.Ledger.aggregate([
            {
                $group: {
                    _id: null,
                    totalPaid: { $sum: "$paid" },
                    totalReceived: { $sum: "$received" }
                }
            }
        ]);
        const net = totalPaid[0].totalReceived - totalPaid[0].totalPaid;
        res.json({ totalPaid: totalPaid[0].totalPaid, totalReceived: totalPaid[0].totalReceived, net });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


  const deleteLedger = async (req, res) => {
    const ledger_id = req.params.ledger_id;
  
    try {
      const deletedLedger= await schemas.Ledger.findOne({ledger_id:ledger_id});
  
      if (!deletedLedger) {
        return res.status(404).json({ message: "Ledger not found." });
      }
      await schemas.Expense.deleteOne({ledger_id});
  
  
      res.status(200).json({ message: "Ledger deleted successfully." });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
module.exports = {
    addLedger,getAllLedgers,getLeadgerbyLedgerId,getLeadgerbyEmployeeId,getLeadgerByClientId,ledgerStatistics,deleteLedger,
}