import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(books);

  return (
    <div className="main-container">
      <h1>TidyHosts is a platform that connect hosts with trusted cleaners, ensuring your property is always guest-ready</h1>
      <p>
        The easiest way for Airbnb hosts and professional cleaners to connect. Whether you're looking for reliable experienced cleaners or need a last minute sweep, we got you covered.
      </p>
    <div className="buttonContainer">
  <button
    className="addHome"
    style={{
      backgroundColor: "#007BFF",  // Blue background color
      color: "#fff",  // White text color
      padding: "10px 20px",  // Padding for the button
      border: "none",  // Remove border
      borderRadius: "5px",  // Rounded corners
      cursor: "pointer",  // Change cursor to pointer
      fontSize: "16px",  // Font size
      marginRight: "10px",  // Space between buttons
    }}
  >
    <Link
      to="/register"
      style={{ color: "inherit", textDecoration: "none" }}
    >
      Register as new member
    </Link>
  </button>

  <button
    className="addHome"
    style={{
      backgroundColor: "#007BFF",  // Blue background color
      color: "#fff",  // White text color
      padding: "10px 20px",  // Padding for the button
      border: "none",  // Remove border
      borderRadius: "5px",  // Rounded corners
      cursor: "pointer",  // Change cursor to pointer
      fontSize: "16px",  // Font size
    }}
  >
    <Link
      to="/login"
      style={{ color: "inherit", textDecoration: "none" }}
    >
      Login
    </Link>
    </button>
        
    </div>
   
  </div>
  
  );
};

export default Books;
