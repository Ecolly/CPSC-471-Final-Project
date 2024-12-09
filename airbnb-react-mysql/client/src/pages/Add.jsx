import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// this is how it gets added to the backend
const Add = () => {
  const [book, setBook] = useState({
    firstName: "",
    middleInitial: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    street: "",
    zip: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    cleaningTools:"",
    bankAccount:"",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault(); //this prevents a refresh of the page 
    try {
      await axios.post("http://localhost:8800/register", book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  //this is the form that we use to register new members
  return (
    <div className="form">
      <h1>Register as New Member</h1>
      <input
        type="text"
        placeholder="First Name"
        name="firstName"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        placeholder="Middle Initial"
        name="middleInitial"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Last Name"
        name="lastName"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        placeholder="City"
        name="city"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Street"
        name="street"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="ZIP"
        name="zip"
        onChange={handleChange}
      />
      <input
        type="tel" //type of input control (tel, text, etc), passord type can obsecure the input box
        placeholder="Phone Number" //hint or guidance text in the input field
        name="phoneNumber" //assign a key to the input value when submitted, used to identify data in the backend
        onChange={handleChange}
        required
      />
      <select name="gender" onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="date"
        name="dateOfBirth"
        onChange={handleChange}
        required
      />
      <select name="role" onChange={handleChange}required>
        <option value="">Select Role</option>
        <option value="cleaner">Cleaner</option>
        <option value="owner">Owner</option>
      </select>
      {book.role === "cleaner" && (
        <>
          <input
            type="text"
            placeholder="Bank Account Number"
            name="bankAccount"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Cleaning Tools"
            name="cleaningTools"
            onChange={handleChange}
            required
          />
        </>
      )}
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
    </div>
  );
};

export default Add;
