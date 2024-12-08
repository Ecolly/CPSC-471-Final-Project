import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateOwner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ownerData, setOwnerData] = useState({});
  const [formValues, setFormValues] = useState({}); // Store user input

  useEffect(() => {
    fetchOwnerData();
  }, []);

  const fetchOwnerData = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/ownerView/${id}`);
      setOwnerData(res.data[0]); // Assuming the API returns an array
      setFormValues(res.data[0]); // Prefill the form with current data
    } catch (err) {
      console.error("Error fetching owner data:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/ownerView/${id}`, formValues);
      alert("Owner information updated successfully!");
      navigate(`/ownerView/${id}`); // Redirect back to the profile view
    } catch (err) {
      console.error("Error updating owner data:", err);
      alert("Failed to update owner information.");
    }
  };

  return (
    <div style={{ textAlign: "left", padding: "20px" }}>
      <h3>Update Owner Information</h3>
      <form onSubmit={handleSubmit}>
        {Object.keys(ownerData).map((key) => (
          <div key={key} style={{ marginBottom: "15px" }}>
            <label>
              <strong>{key.replace(/_/g, " ")}:</strong>
            </label>
            <br />
            <input
              type="text"
              name={key}
              value={formValues[key] || ""}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "8px",
                margin: "5px 0",
                border: "1px solid #ddd",
              }}
            />
          </div>
        ))}
        <button type="submit" style={{ marginTop: "10px", padding: "10px 20px" }}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateOwner;
