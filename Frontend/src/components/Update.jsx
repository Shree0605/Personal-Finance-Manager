import { useState } from "react";
import "./Update.css";
import Header from "../components/Header";
import vbg from "../assets/vbg.mp4";

const TransactionForm = () => {
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState({
    name: "",
    amount: "",
    type: "Expense",
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const addTransaction = () => {
    if (!transaction.name || !transaction.amount) return;

    setTransactions([...transactions, transaction]);
    setTransaction({ name: "", amount: "", type: "Expense" });
  };

  const getTotalExpense = () => {
    return transactions
      .filter((t) => t.type === "Expense")
      .reduce((total, t) => total + parseFloat(t.amount), 0)
      .toFixed(2);
  };

  return (
    <>
    <Header />
      <video autoPlay muted loop className="video-bg">
        <source src={vbg} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

    <div className="container">
      <h2>Update Your Transactions</h2>
      <div className="transaction-form">
        <input
          type="text"
          name="name"
          placeholder="Transaction Name"
          value={transaction.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={transaction.amount}
          onChange={handleChange}
        />
        <select name="type" value={transaction.type} onChange={handleChange}>
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
          <option value="savings">Savings</option>
          <option value="Loan">Loan</option>
        </select>
        <button onClick={addTransaction}>Add Transaction</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Transaction Name</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, index) => (
            <tr key={index}>
              <td>{t.name}</td>
              <td>${t.amount}</td>
              <td>{t.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="expense-summary">
        <h3>Total Expense This Month: ${getTotalExpense()}</h3>
      </div>
    </div>
    </>
  );
};

export default TransactionForm;


