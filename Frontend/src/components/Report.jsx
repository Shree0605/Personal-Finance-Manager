import  { useState, useEffect } from "react";
import axios from "axios";
import "./Report.css";
import Header from "../components/Header"; // Import the Header component// BsFilter is the filter icon
import vbg from "../assets/vbg.mp4"

const Report = () => {
  const [year, setYear] = useState(new Date().getFullYear()); // Default: Current Year
  const [month, setMonth] = useState(""); // Default: No Month Selected
  const [transactions, setTransactions] = useState([]);

  // 📌 Fetch Transactions on Year/Month Change
  useEffect(() => {
    if (year) {
      let url = `http://localhost:5000/api/transactions?year=${year}`;
      if (month) url += `&month=${month}`;
      
      axios.get(url)
        .then((response) => setTransactions(response.data))
        .catch((error) => console.error("Error fetching transactions:", error));
    }
  }, [year, month]);

  // 📌 Function to Convert Transactions to CSV Format
  const exportToCSV = () => {


    if (transactions.length === 0) {
      alert("No transactions available for the selected period.");
      return;
    }

    const csvRows = [];
    csvRows.push("Date, Name, Amount, Type");

    transactions.forEach((txn) => {
      csvRows.push(`${txn.date}, ${txn.name}, ${txn.amount}, ${txn.type}`);
    });

    const csvContent = csvRows.join("\n"); // Join CSV rows into a single string

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Transactions_${year}${month ? `_${month}` : ""}.csv`;
    link.click();
  };
  // function DownloadReport() {

    const handleDownload = () => {
        window.open("/api/download-report", "_blank"); // Open the API endpoint in a new tab
    };

  return (
    <>
    <Header />
    <video autoPlay muted loop className="video-bg">
    <source src={vbg} type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
    <div className="report-container">
      {/* Uncomment the following line if you want to use the DownloadReport function */}
      {/* <DownloadReport /> */}

      <h2>Download Transaction Report</h2>

      {/* 📌 Year Selection */}
      <label>Year:</label>
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        {[2025, 2024, 2023, 2022, 2021].map((yr) => (
          <option key={yr} value={yr}>{yr}</option>
        ))}
      </select>

      {/* 📌 Month Selection (Optional) */}
      <label>Month:</label>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="">Full Year</option>
        {[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ].map((m, i) => (
          <option key={i} value={i + 1}>{m}</option>
        ))}
      </select>

      {/* 📌 Download Button for CSV Export */}
      <button onClick={exportToCSV}>Export to CSV</button>

      <button onClick={handleDownload}>Download Report</button>


      {/* 📌 Display Transactions */}
      
    </div>
    </>
  );
};

export default Report;
