import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateOwner.css"; 

const AddPaymentMethod = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    idowner: id,  // Set owner ID from URL
    paymentMethod: "Credit Card",  // Default to Credit Card
    cardNumber: "",
    cardName: "",
    billingAddress: "",
    expiryDate: "",
    accountNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      let endpoint = "";
      if (formData.paymentMethod === "Credit Card") {
        endpoint = `http://localhost:8800/addCreditCard/${id}`;
    } if (formData.paymentMethod === "Debit Card") {
        endpoint = `http://localhost:8800/addDebitCard/${id}`;
    }
    else if (formData.paymentMethod === "Paypal") {
        endpoint = `http://localhost:8800/addPaypal/${id}`;
      }

      await axios.post(endpoint, formData);
      navigate(`/ownerView/${id}`);
    } catch (err) {
      console.error("Error adding payment method:", err);
      alert("Failed to add payment method.");
    }
  };

  return (
    <div className="add-payment-method-container">
      <h2 className="add-payment-method-title">Add Payment Method</h2>
      <form onSubmit={handleSave} className="add-payment-method-form">
        <div className="form-group-horizontal">
          <label htmlFor="paymentMethod" className="form-label">Payment Method:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="form-input"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Paypal">PayPal</option>
          </select>
        </div>

        {formData.paymentMethod === "Credit Card" || formData.paymentMethod === "Debit Card" ? (
          <>
            <div className="form-group-horizontal">
              <label htmlFor="cardNumber" className="form-label">Card Number:</label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                value={formData.cardNumber}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group-horizontal">
              <label htmlFor="cardName" className="form-label">Cardholder Name:</label>
              <input
                id="cardName"
                name="cardName"
                type="text"
                value={formData.cardName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group-horizontal">
              <label htmlFor="billingAddress" className="form-label">Billing Address:</label>
              <input
                id="billingAddress"
                name="billingAddress"
                type="text"
                value={formData.billingAddress}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group-horizontal">
              <label htmlFor="expiryDate" className="form-label">Expiry Date:</label>
              <input
                id="expiryDate"
                name="expiryDate"
                type="month"
                value={formData.expiryDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </>
        ) : formData.paymentMethod === "Paypal" ? (
          <div className="form-group-horizontal">
            <label htmlFor="accountNumber" className="form-label">PayPal Account Number:</label>
            <input
              id="accountNumber"
              name="accountNumber"
              type="text"
              value={formData.accountNumber}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        ) : null}

        <button type="submit" className="save-button">Add Payment Method</button>
      </form>
    </div>
  );
};

export default AddPaymentMethod;
