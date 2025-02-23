
import {BrowserRouter as Router, Routes, Route  } 
from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import Login from './components/Login'
import Home from'./components/Home'


function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Login />} /> {/* Default to login */}
        
      </Routes>
    </Router>
    </div>
  )
}

export default App
