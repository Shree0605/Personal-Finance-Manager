import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import "./Update.css";
import Header from "../components/Header";
import vbg from "../assets/vbg.mp4";


  const Update = () => {
    const { transactions, setTransactions } = useTransactions(); // Get transactions from context
    const [transaction, setTransaction] = useState({ name: "", amount: "", type: "Expense", date: "" });
  
    const handleChange = (e) => {
      setTransaction({ ...transaction, [e.target.name]: e.target.value });
    };


  const addTransaction = () => {
    if (!transaction.name || !transaction.amount || !transaction.date) return;
    setTransactions([...transactions, transaction]); // Update Context
    setTransaction({ name: "", amount: "", type: "Expense", date: "" });
  };

  // Function to get total amount for a specific type
  const getTotalAmount = (type) => {
    return transactions
      .filter((t) => t.type === type)
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
            type="text" name="name" placeholder="Transaction Name" value={transaction.name} onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={transaction.amount}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
          />
          <select name="type" value={transaction.type} onChange={handleChange}>
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
            <option value="Savings">Savings</option>
            <option value="Loan">Loan</option>
          </select>
          <button onClick={addTransaction}>Add Transaction</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction Name</th>
              <th>Amount</th>
              <th>Type</th>
              
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <tr key={index}>
                <td>{t.date}</td>
                <td>{t.name}</td>
                <td>₹{t.amount}</td>
                <td>{t.type}</td>
                
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  );
};

export default Update;
