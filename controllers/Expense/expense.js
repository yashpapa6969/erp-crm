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
      const expense = await schemas.Expense.findById( { expense_id: req.params.expense_id },);
      res.json(expense);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

  const createExpenses = async (req, res) => {
    try {
      const newExpense = new schemas.Expense(req.body);
      const savedExpense = await newExpense.save();
      res.status(201).json(savedExpense);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

  const updateExpense = async (req, res) => {
    try {
      const updatedExpense = await schemas.Expense.findByIdAndUpdate({ expense_id: req.params.expense_id }, // Query by expense_id
      req.body, { new: true });
      res.json(updatedExpense);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

  const deleteExpense =  async (req, res) => {
    try {
      await schemas.Expense.findByIdAndDelete( { expense_id: req.params.expense_id }, );
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error);
    }
  };

   module.exports={getAllExpenses,getExpenseById,createExpenses,updateExpense,deleteExpense,}
  