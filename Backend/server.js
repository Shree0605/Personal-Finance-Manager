const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const transactionsRoutes = require("./routes/transactions");
const Transaction = require("./models/Transaction");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/finmann", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  transactions: { type: Number, default: 0 }  // Initialize all values to 0
});

const User = mongoose.model("User", UserSchema);


const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["Income", "Expense"], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Store transactions per user
});


module.exports = Transaction;


// Register User
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, transactions: 0 });
    await newUser.save();

    res.status(201).json({ message: `Welcome, ${username}!` });  // Custom welcome message
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login User
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });

    res.json({ 
      message: `Welcome back, ${username}!`,  // Custom welcome-back message
      token,
      userDetails: user  // Send user details back
    });

  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/transactions", async (req, res) => {
  try {
    const { year, month } = req.query;

    if (!year) {
      return res.status(400).json({ error: "Year is required." });
    }

    let filter = { date: { $regex: `^${year}` } };

    if (month) {
      filter.date = { $regex: `^${year}-${month.padStart(2, '0')}` };
    }

    const transactions = await Transaction.find(filter);
    res.json(transactions);

  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Server Error" });
  }
});
app.get("/api/download-report", async (req, res) => {
  try {
      const transactions = await Transaction.find(); // Fetch transactions from the database
      // Convert transactions to the desired format (e.g., CSV)
      const csv = json2csv(transactions); // Use json2csv library
      res.header("Content-Type", "text/csv");
      res.attachment("report.csv");
      res.send(csv);
  } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
