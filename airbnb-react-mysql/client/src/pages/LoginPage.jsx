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
    // else if (role === "owner") {
    //   navigate("/owner-dashboard"); // Navigate to owner dashboard
    // }
    try {
      // Send a POST request to the backend login endpoint
      const res = await axios.post("http://localhost:8800/login", credentials);
      const { role, id } = res.data;
      //console.log("Login successful. Role:", res.data.role, "ID:", res.data.idusers);

        // Navigate to home page or another route upon successful login
      if (role == "cleaner") {
        navigate(`/cleanerView/${id}`); // Navigate to cleaner dashboard
      }
      if (role == "owner") {
        navigate(`/ownerView/${id}`); // Navigate to cleaner dashboard
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
        placeholder="email"
        name="email"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="password"
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
