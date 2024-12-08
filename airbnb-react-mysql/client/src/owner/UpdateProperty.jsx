import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateOwner.css"; // Link to your CSS file

const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ownerId, setOwnerId] = useState(null); 
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    zip: "",
    propertyName: "",
    size: "",
    numberOfRooms: "",
    type: "",
    checkInTime: "",
    checkOutTime: "",
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/IDpropertyView/${id}`);
        const property = res.data[0];
        setOwnerId(property.idowner);

        setFormData({
          street: property.Street || "",
          city: property.City || "",
          zip: property.ZIP || "",
          propertyName: property["Property Name"] || "",
          size: property["Size (sqt feet)"] || "",
          numberOfRooms: property["Number of rooms"] || "",
          type: property.Type || "",
          checkInTime: property.CheckInTime || "",
          checkOutTime: property.CheckoutTime || "",
        });
      } catch (err) {
        console.error("Error fetching property data:", err);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/updatePropertyView/${id}`, formData);
      navigate(`/ownerView/${ownerId}`);
    } catch (err) {
      console.error("Error updating property:", err);
      alert("Failed to update property.");
    }
  };

  return (
    <div className="update-property-container">
      <h2 className="update-property-title">Update Property Info</h2>
      <form onSubmit={handleSave} className="update-property-form">
        {[
          { label: "Property Name", name: "propertyName", type: "text", required: true },
          { label: "Street", name: "street", type: "text" },
          { label: "City", name: "city", type: "text" },
          { label: "ZIP", name: "zip", type: "text" },
          { label: "Size (sqft)", name: "size", type: "text" },
          { label: "Number of Rooms", name: "numberOfRooms", type: "text" },
          { label: "Type", name: "type", type: "text" },
          { label: "Check-in Time", name: "checkInTime", type: "time" },
          { label: "Check-out Time", name: "checkOutTime", type: "time" },
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

export default UpdateProperty;
