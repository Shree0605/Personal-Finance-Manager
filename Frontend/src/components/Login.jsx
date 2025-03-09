import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (isRegister && !formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (isRegister && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const endpoint = isRegister ? "http://localhost:5000/api/register" : "http://localhost:5000/api/login";
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }

        alert(data.message);  // Show the welcome message from the backend
        if (isRegister) {
          navigate("/login");
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.userDetails)); // Store user details
          navigate("/home");
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="background">
      <div className="form-container">
        <div className="toggle-buttons">
          <button className={!isRegister ? "active" : ""} onClick={() => setIsRegister(false)}>LOGIN</button>
          <button className={isRegister ? "active" : ""} onClick={() => setIsRegister(true)}>REGISTER</button>
        </div>
        <h2>{isRegister ? "Register" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} placeholder="Enter username" />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          {isRegister && (
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Enter email" />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          )}
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Enter password" />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          {isRegister && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} placeholder="Confirm password" />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
          )}
          <button type="submit" className="submit-btn">{isRegister ? "Register" : "Login"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
