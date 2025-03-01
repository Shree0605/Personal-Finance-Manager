import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="header">
      <div className="logo">FinMan</div>

      <div className="nav-profile">
        {/* Navigation Links */}
        <nav className="nav-links">
          <NavLink to="/home" activeClassName="active">Home</NavLink>
          <NavLink to="/update" activeClassName="active">Update</NavLink>
          <NavLink to="/report" activeClassName="active">Report</NavLink>
        </nav>

        {/* Profile Section */}
        <div className="profile">
          <FaUserCircle className="profile-icon" onClick={toggleDropdown} />
          <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
            <a href="/profile">Profile</a>
            <a href="/settings">Settings</a>
            <a href="/logout">Logout</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
