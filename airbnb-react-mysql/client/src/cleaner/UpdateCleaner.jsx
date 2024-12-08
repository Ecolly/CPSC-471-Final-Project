import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateCleaner.css"; // Link to CSS file

const UpdateCleaner = () => {
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
    bankAccount: "",
    cleaningTools: "",
  });

  useEffect(() => {
    const fetchCleaner = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/updateCleaner/${id}`);
        const cleaner = res.data.data[0];
        setFormData({
          firstName: cleaner["First Name"],
          middleInitial: cleaner["Middle Initial"] || "",
          lastName: cleaner["Last Name"],
          email: cleaner.Email,
          password: cleaner.Password,
          city: cleaner.City || "",
          street: cleaner.Street || "",
          zip: cleaner.ZIP || "",
          phoneNumber: cleaner["Phone Number"],
          gender: cleaner.Gender,
          dateOfBirth: cleaner["Date of Birth"]
            ? new Date(cleaner["Date of Birth"]).toISOString().substr(0, 10)
            : "",
          bankAccount: cleaner["Bank Account #"] || "",
          cleaningTools: cleaner["Cleaning Tools"] || "",
        });
      } catch (err) {
        console.error("Error fetching cleaner data:", err);
      }
    };

    fetchCleaner();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/updateCleaner/${id}`, formData);
      alert("Cleaner updated successfully!");
      navigate(`/cleanerView/${id}`); // Redirect to cleaner profile page
    } catch (err) {
      console.error("Error updating cleaner:", err);
      alert("Failed to update cleaner.");
    }
  };

  return (
    <div className="update-cleaner-container">
      <h2 className="update-cleaner-title">Update Cleaner Profile</h2>
      <form onSubmit={handleSave} className="update-cleaner-form">
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
          { label: "Bank Account", name: "bankAccount", type: "text" },
          { label: "Cleaning Tools", name: "cleaningTools", type: "text" },
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

export default UpdateCleaner;
