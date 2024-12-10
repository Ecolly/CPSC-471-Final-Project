import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateOwner.css";

const AddProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    idowner: "",
    Street: "",
    City: "",
    ZIP: "",
    "Property Name": "",
    "Size (sqt feet)": "",
    "Number of rooms": "",
    Type: "Apartment",
    CheckInTime: "",
    CheckoutTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8800/addProperty/${id}`, formData);
      navigate(`/ownerView/${id}`); 
    } catch (err) {
      console.error("Error adding property:", err);
      alert("Failed to add property.");
    }
  };

  return (
    <div className="add-property-container">
      <h2 className="add-property-title">Add Property</h2>
      <form onSubmit={handleSave} className="add-property-form">
        {[
          { label: "Street", name: "Street", type: "text", required: true },
          { label: "City", name: "City", type: "text", required: true },
          { label: "ZIP", name: "ZIP", type: "text", required: true },
          { label: "Property Name", name: "Property Name", type: "text", required: true },
          { label: "Size (sqt feet)", name: "Size (sqt feet)", type: "number", required: true },
          { label: "Number of Rooms", name: "Number of rooms", type: "number", required: true },
          {
            label: "Type",
            name: "Type",
            type: "select",
            options: ["Apartment", "House", "Villa", "Condo", "Townhouse", "Bungalow"],
          },
          { label: "Check-In Time", name: "CheckInTime", type: "time", required: true },
          { label: "Check-Out Time", name: "CheckoutTime", type: "time", required: true },
        ].map((field) => (
          <div className="form-group-horizontal" key={field.name}>
            <label htmlFor={field.name} className="form-label">
              {field.label}:
            </label>
            {field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required || false}
                className="form-input"
              >
                {field.options.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required || false}
                className="form-input"
              />
            )}
          </div>
        ))}
        <button type="submit" className="save-button">Add Property</button>
      </form>
    </div>
  );
};

export default AddProperty;
