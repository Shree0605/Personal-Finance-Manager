const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD format
  month: { type: Number, required: true }, // Extracted from the date
  year: { type: Number, required: true }, // Extracted from the date
});

module.exports = mongoose.model("Transaction", TransactionSchema);
