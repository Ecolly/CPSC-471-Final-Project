import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateOwner.css"; // Link to CSS file

const AddRequest = () => {
  const { id } = useParams(); // Owner ID
  const navigate = useNavigate();
  const [paymentOptions, setPaymentOptions] = useState([]); // Payment methods
  const [properties, setProperties] = useState([]); // Properties owned by the user
  const [formData, setFormData] = useState({
    propertyId: "",
    paymentAmount: "",
    paymentType: "",
    serviceDescription: "",
    serviceDate: "",
  });

  useEffect(() => {
    const fetchPaymentOptionsAndProperties = async () => {
      try {
        //payment options of the owner
        const paymentRes = await axios.get(`http://localhost:8800/paymentOptions/${id}`);
        setPaymentOptions(paymentRes.data);

        //properties associated with the owner
        const propertyRes = await axios.get(`http://localhost:8800/propertyView/${id}`);
        setProperties(propertyRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    //get it from the owner
    fetchPaymentOptionsAndProperties();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8800/addRequest/${id}`, formData);
      navigate(`/ownerView/${id}`); // Redirect to owner view
    } catch (err) {
      console.error("Error adding request:", err);
      alert("Failed to add request.");
    }
  };

  return (
    <div className="add-request-container">
      <h2 className="add-request-title">Make Request</h2>
      <form onSubmit={handleSave} className="add-request-form">
        {/* Property Selector */}
        <div className="form-group-horizontal">
          <label htmlFor="propertyId" className="form-label">Property:</label>
          <select
            id="propertyId"
            name="propertyId"
            value={formData.propertyId}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Select Property</option>
            {properties.map((property) => (
              <option value={property.idproperty} key={property.idproperty}>
                {property["Property Name"]}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Amount */}
        <div className="form-group-horizontal">
          <label htmlFor="paymentAmount" className="form-label">Payment Amount:</label>
          <input
            id="paymentAmount"
            name="paymentAmount"
            type="number"
            step="0.01"
            value={formData.paymentAmount}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Payment Type Selector */}
        <div className="form-group-horizontal">
          <label htmlFor="paymentType" className="form-label">Payment Type:</label>
          <select
            id="paymentType"
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Select Payment Type</option>
            {paymentOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Service Description */}
        <div className="form-group-horizontal">
          <label htmlFor="serviceDescription" className="form-label">Service Description:</label>
          <textarea
            id="serviceDescription"
            name="serviceDescription"
            value={formData.serviceDescription}
            onChange={handleChange}
            className="form-input"
            placeholder="Describe the service required..."
          />
        </div>

        {/* Service Date */}
        <div className="form-group-horizontal">
          <label htmlFor="serviceDate" className="form-label">Service Date:</label>
          <input
            id="serviceDate"
            name="serviceDate"
            type="date"
            value={formData.serviceDate}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="save-button">Add Request</button>
      </form>
    </div>
  );
};

export default AddRequest;