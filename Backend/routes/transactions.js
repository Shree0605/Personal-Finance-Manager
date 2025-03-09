const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();

// Add a new transaction
router.post("/add", async (req, res) => {
  const { name, amount, type, date } = req.body;

  if (!name || !amount || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const transactionDate = new Date(date);
  const month = transactionDate.getMonth() + 1; // Get month (1-12)
  const year = transactionDate.getFullYear(); // Get year

  try {
    const newTransaction = new Transaction({
      name,
      amount,
      type,
      date,
      month,
      year,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Error saving transaction", error });
  }
});

// Fetch transactions for the current month
router.get("/current-month", async (req, res) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Get current month
  const currentYear = currentDate.getFullYear(); // Get current year

  try {
    const transactions = await Transaction.find({ month: currentMonth, year: currentYear });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
});

module.exports = router;
