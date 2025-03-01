import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Update from "./components/Update";
 // Import Context Provider

function App() {
  return (
   
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/update" element={<Update />} />
            <Route path="*" element={<Login />} /> {/* Default to login */}
          </Routes>
        </Router>
      
  );
}

export default App;
