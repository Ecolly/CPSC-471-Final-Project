import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateOwner.css"; 

//owner update
const UpdateOwner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/ownerView/${id}`);
        const owner = res.data[0];
        setFormData({
          firstName: owner["First Name"],
          middleInitial: owner["Middle Initial"] || "",
          lastName: owner["Last Name"],
          email: owner.Email,
          password: owner.Password,
          city: owner.City || "",
          street: owner.Street || "",
          zip: owner.ZIP || "",
          phoneNumber: owner["Phone Number"],
          gender: owner.Gender,
          dateOfBirth: owner["Date of Birth"]
            ? new Date(owner["Date of Birth"]).toISOString().substr(0, 10)
            : "",
        });
      } catch (err) {
        console.error("Error fetching owner data:", err);
      }
    };

    fetchOwner();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/ownerView/${id}`, formData);
      navigate(`/ownerView/${id}`); // Redirect to the main page or owner profile page
    } catch (err) {
      console.error("Error updating owner:", err);
      alert("Failed to update owner.")
    }
  };

  return (
    <div className="update-owner-container">
      <h2 className="update-owner-title">Update Profile</h2>
      <form onSubmit={handleSave} className="update-owner-form">
        {[
          { label: "First Name", name: "firstName", type: "text", required: true },
          { label: "Middle Initial", name: "middleInitial", type: "text" },
          { label: "Last Name", name: "lastName", type: "text", required: true },
          { label: "Email", name: "email", type: "email", required: true },
          { label: "Password", name: "password", type: "password", required: true },
          { label: "City", name: "city", type: "text" },
          { label: "Street", name: "street", type: "text" },
          { label: "ZIP", name: "zip", type: "text" },
          { label: "Phone Number", name: "phoneNumber", type: "text", required: true },
          { label: "Gender", name: "gender", type: "text" },
          { label: "Date of Birth", name: "dateOfBirth", type: "date", required: true },
        ].map((field) => (
          <div className="form-group-horizontal" key={field.name}>
            <label htmlFor={field.name} className="form-label">
              {field.label}:
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required || false}
              className="form-input"
            />
          </div>
        ))}
        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
};

export default UpdateOwner;
