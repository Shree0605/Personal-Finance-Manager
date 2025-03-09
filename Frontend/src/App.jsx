import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TransactionProvider } from "./context/TransactionContext"; // Import Context Provider
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Update from "./components/Update";
import Report from "./components/Report";


function App() {
  return (
    <TransactionProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/update" element={<Update />} />
          <Route path="/report" element={<Report />} />
          <Route path="*" element={<Login />} /> {/* Default to login */}
        </Routes>
      </Router>
    </TransactionProvider>
  );
}

export default App;
