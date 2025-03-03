const express = require("express");
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Add Expense
router.post("/", authMiddleware, async (req, res) => {
  const { title, amount, category } = req.body;
  try {
    const newExpense = new Expense({ userId: req.user.id, title, amount, category });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Expenses for User
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Expense
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;