const schemas = require("../../mongodb/schemas/schemas");

// Define async functions for each operation

const getTotalPaidInvoicesCount = async () => {
  try {
    const count = await schemas.Invoice.countDocuments({ paid: true });
    return { totalPaidInvoices: count };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTotalUnpaidInvoicesCount = async () => {
  try {
    const count = await schemas.Invoice.countDocuments({ paid: false });
    return { totalUnpaidInvoices: count };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getLifetimeSales = async () => {
  try {
    const result = await schemas.Invoice.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$totalCollected" } } }
    ]);
    return { totalLifetimeSales: result.length ? result[0].totalSales : 0 };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAverageInvoiceAmount = async () => {
  try {
    const result = await schemas.Invoice.aggregate([
      { $group: { _id: null, averageInvoiceAmount: { $avg: "$total" } } }
    ]);
    return { averageInvoiceAmount: result.length ? result[0].averageInvoiceAmount : 0 };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getMonthlySalesReport = async () => {
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
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getTotalPaidInvoicesCount,
  getTotalUnpaidInvoicesCount,
  getLifetimeSales,
  getAverageInvoiceAmount,
  getMonthlySalesReport
};
