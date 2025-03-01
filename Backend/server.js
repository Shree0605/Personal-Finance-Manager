const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/finmann", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

const UserSchema = new mongoose.Schema({ username: String, email: String, password: String });
const User = mongoose.model("User", UserSchema);

app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already in use" });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const TransactionSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    type: String, // "income" or "expense"
    date: { type: Date, default: Date.now },
  });
  
  const Transaction = mongoose.model("Transaction", TransactionSchema);
  
  // Add Transaction Route
  app.post("/api/transactions", async (req, res) => {
    const { name, amount, type } = req.body;
    try {
      const newTransaction = new Transaction({ name, amount, type });
      await newTransaction.save();
      res.json(newTransaction);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Get Transactions Route
  app.get("/api/transactions", async (req, res) => {
    try {
      const transactions = await Transaction.find();
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

app.listen(5000, () => console.log("Server running on port 5000"));