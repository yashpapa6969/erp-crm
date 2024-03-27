const schemas = require("../../mongodb/schemas/schemas");

// Define async functions for each operation


const getTotalPaidInvoicesCount = async (req, res) => {
    try {
      const count = await schemas.Invoice.countDocuments({ paid: true });
      res.json({ totalPaidInvoices: count });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


const getTotalUnpaidInvoicesCount = async (req, res) => {
    try {
      const count = await schemas.Invoice.countDocuments({ paid: false });
      res.json({ totalUnpaidInvoices: count });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getLifetimeSales = async (req, res) => {
    try {
      const result = await schemas.Invoice.aggregate([
        { $group: { _id: null, totalSales: { $sum: "$totalCollected" } } }
      ]);
      res.json({ totalLifetimeSales: result.length ? result[0].totalSales : 0 });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


const getAverageInvoiceAmount  = async (req, res) => {
    try {
      const result = await schemas.Invoice.aggregate([
        { $group: { _id: null, averageInvoiceAmount: { $avg: "$total" } } }
      ]);
      res.json({ averageInvoiceAmount: result.length ? result[0].averageInvoiceAmount : 0 });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


const getMonthlySalesReport =  async (req, res) => {
    try {
      const result = await schemas.Invoice.aggregate([
        {
          $group: {
            _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
            totalSales: { $sum: "$totalCollected" },
            averageSalePerInvoice: { $avg: "$totalCollected" },
            numberOfInvoices: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ]);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports = {
  getTotalPaidInvoicesCount,
  getTotalUnpaidInvoicesCount,
  getLifetimeSales,
  getAverageInvoiceAmount,
  getMonthlySalesReport
};
