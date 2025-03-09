const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  transactions: [transactionSchema], // This should be an array of transaction objects
});

const User = mongoose.model('User ', userSchema);