const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Fetch transactions for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)
    const currentYear = new Date().getFullYear();   // Get current year

    const transactions = await Transaction.find({
      userId,
      month: currentMonth,
      year: currentYear,
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get total expense, income, savings, loan, and balance for a user
router.get("/totals/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });

    const totals = {
      Expense: 0,
      Income: 0,
      Savings: 0,
      Loan: 0,
      TotalBalance: 0
    };

    transactions.forEach((t) => {
      totals[t.type] += t.amount;
    });

    totals.TotalBalance = totals.Income - totals.Expense + totals.Savings - totals.Loan;

    res.json(totals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a transaction for a specific user
router.post("/add", async (req, res) => {
  try {
    const { userId, name, amount, type, date } = req.body;
    if (!userId) return res.status(400).json({ error: "User ID is required" });

    const newTransaction = new Transaction({
      userId, // Include userId
      name,
      amount,
      type,
      date,
      month: new Date(date).getMonth() + 1,
      year: new Date(date).getFullYear(),
    });

    await newTransaction.save();
    res.status(201).json({ message: "Transaction added", transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
