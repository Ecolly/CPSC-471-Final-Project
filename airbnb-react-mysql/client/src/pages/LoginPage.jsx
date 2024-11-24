import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error,setError] = useState(false)

  ///const location = useLocation();
  const navigate = useNavigate();

  //const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend login endpoint
      const res = await axios.post("http://localhost:8800/login", credentials);
      if (res.data.success) {
        // Navigate to home page or another route upon successful login
        navigate("/");
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Login</button>
      {error && <p style={{ color: "red" }}>Invalid email or password!</p>}
      <Link to="/register">Don't have an account? Register here</Link>
    </div>
  );
};


export default Login;
