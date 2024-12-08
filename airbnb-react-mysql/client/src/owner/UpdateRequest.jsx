import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateOwner.css"; // Link to your CSS file

const UpdateRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ownerId, setOwnerId] = useState(null);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [formData, setFormData] = useState({
    paymentAmount: "",
    paymentType: "",
    serviceDescription: "",
    serviceDate: "",
  });

  // Fetch request and payment options
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/requestView/${id}`);
        const request = res.data[0];
        setOwnerId(request.ownerid);

        setFormData({
          paymentAmount: request["Payment Amount"] || "",
          paymentType: request["Payment Type"] || "",
          serviceDescription: request["Service Description"] || "",
          serviceDate: request["Service date"] || "",
        });

        // Fetch available payment options
        const paymentRes = await axios.get(`http://localhost:8800/paymentOptions/${request.ownerid}`);
        setPaymentOptions(paymentRes.data);
      } catch (err) {
        console.error("Error fetching request data:", err);
      }
    };

    fetchRequest();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/updateRequest/${id}`, formData);
      navigate(`/ownerView/${ownerId}`);
    } catch (err) {
      console.error("Error updating request:", err);
      alert("Failed to update request.");
    }
  };

  return (
    <div className="update-request-container">
      <h2 className="update-request-title">Update Request</h2>
      <form onSubmit={handleSave} className="update-request-form">
        {[ 
          { label: "Payment Amount", name: "paymentAmount", type: "number", required: true },
          { label: "Service Description", name: "serviceDescription", type: "text" },
          { label: "Service Date", name: "serviceDate", type: "date", required: true },
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

        <div className="form-group-horizontal">
          <label htmlFor="paymentType" className="form-label">Payment Type:</label>
          <select
            id="paymentType"
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Payment Type</option>
            {paymentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
};

export default UpdateRequest;
