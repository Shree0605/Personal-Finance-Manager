import { useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Use an icon from react-icons
import "./Header.css";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="header">
      <div className="logo">FinMan</div>
      <div className="profile">
        <FaUserCircle className="profile-icon" onClick={toggleDropdown} />
        <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
          <a href="/profile">Profile</a>
          <a href="/settings">Settings</a>
          <a href="/logout">Logout</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
