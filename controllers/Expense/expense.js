const schemas = require("../../mongodb/schemas/schemas");
const { buildDateRangeQuery } = require("../../middleware/rangeFilter");
const getAllExpenses= async (req, res) => {
  const { financialYear, month, quarter, firstQuarterMonth } = req.body;
  try {
      const query = buildDateRangeQuery(financialYear, month, quarter, firstQuarterMonth);
      const expenses = await schemas.Expense.find(query);
      res.json(expenses);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  


const getExpenseById=async (req, res) => {
    try {
      const expense = await schemas.Expense.find( { expense_id: req.params.expense_id },);
      res.json(expense);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

  const createExpenses = async (req, res) => {
    try {
      const newExpense = new schemas.Expense(req.body);
      const savedExpense = await newExpense.save();
      if (req.body.amountReceived && req.body.amountReceived > 0) {

        const companyName = "Adversify"; 
        const brandName = "Adversify"; 
        const clientName = "Adversify"; 
  
        const newLedgerEntry = new schemas.Ledger({
          companyName: companyName,
          brandName: brandName,
          clientName: clientName,
          employee_id: req.body.employee_id, 
          description: `Expense recorded: ${savedExpense.description}`,
          paid: req.body.amountReceived,
        });
        await newLedgerEntry.save();
      }
  
      res.status(201).json(savedExpense);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  const updateExpense = async (req, res) => {
    try {
      const updatedExpense = await schemas.Expense.findOneAndUpdate({ expense_id: req.params.expense_id }, 
      req.body, { new: true });
      res.json(updatedExpense);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  


  const deleteExpense = async (req, res) => {
    const expense_id = req.params.expense_id;
  
    try {
      const deletedExpense= await schemas.Expense.findOne({expense_id:expense_id});
  
      if (!deletedExpense) {
        return res.status(404).json({ message: "Expense not found." });
      }
      await schemas.Expense.deleteOne({expense_id});
  
  
      res.status(200).json({ message: "Expense deleted successfully." });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

   module.exports={getAllExpenses,getExpenseById,createExpenses,updateExpense,deleteExpense,}
  