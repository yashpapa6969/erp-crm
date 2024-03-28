const schemas = require("../../mongodb/schemas/schemas");

const getAllExpenses= async (req, res) => {
    try {
      const expenses = await schemas.Expense.find();
      res.json(expenses);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
const getExpenseById=async (req, res) => {
    try {
      const expense = await schemas.Expense.findById(req.params.expense_id);
      res.json(expense);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  // Create a new expense
  const createExpenses = async (req, res) => {
    try {
      const newExpense = new schemas.Expense(req.body);
      const savedExpense = await newExpense.save();
      res.status(201).json(savedExpense);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  // Update an expense
  const updateExpense = async (req, res) => {
    try {
      const updatedExpense = await schemas.Expense.findByIdAndUpdate(req.params.expense_id, req.body, { new: true });
      res.json(updatedExpense);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  // Delete an expense
  const deleteExpense =  async (req, res) => {
    try {
      await schemas.Expense.findByIdAndDelete(req.params.expense_id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error);
    }
  };

   module.exports={getAllExpenses,getExpenseById,createExpenses,updateExpense,deleteExpense,}
  