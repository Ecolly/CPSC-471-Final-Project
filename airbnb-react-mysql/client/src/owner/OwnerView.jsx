import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./OwnerProfile.css";

const OwnerView = () => {
  const [error, setError] = useState(false);
  const { id } = useParams();
  const [owners, setOwners] = useState([]);
  const [content, setContent] = useState(null);
  const navigate = useNavigate(); 
  const [currentSection, setCurrentSection] = useState('profile'); 



  const handleViewProperties = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8800/propertyView/${id}`); // Fetch properties by owner ID
      const properties = res.data;
  
      setContent(
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3>Owner's Properties</h3>
          <button
            onClick={() => navigate(`/addProperty/${id}`)}
            style={{
              padding: "5px 15px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Add Property
          </button>
          </div>
          {properties.length > 0 ? (
            properties.map((property) => (
              <div
                key={property.idproperty}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  marginBottom: "15px",
                  textAlign: "left",
                }}
              >
                <p>
                  <strong>Street:</strong> {property.Street} |{" "}
                  <strong>City:</strong> {property.City} |{" "}
                  <strong>ZIP:</strong> {property.ZIP} |{" "}
                  <strong>Property Name:</strong> {property["Property Name"]}
                  <strong>Size:</strong> {property["Size (sqt feet)"]} sq. feet |{" "}
                  <strong>Rooms:</strong> {property["Number of rooms"]} |{" "}
                  <strong>Type:</strong> {property.Type} |{" "}
                  <strong>Check-in Time:</strong> {property.CheckInTime} |{" "}
                  <strong>Checkout Time:</strong> {property.CheckoutTime}
                  
                </p>
                <button
                  onClick={() => handleEditProperty(property.idproperty)}
                  style={{ marginRight: "10px" }}
                >
                  Edit Property
                </button>
              </div>
            ))
          ) : (
            <p>No properties found for this owner.</p>
          )}
        </div>
      );
    } catch (err) {
      console.error("Error fetching properties:", err.response || err.message);
      setError(true);
      setContent("Something went wrong while fetching the property data.");
    }
  };
  

  //
  const handleViewRequests = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8800/requestsView/${id}`); // Fetch requests by owner ID
      const requests = res.data;
  
      setContent(
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3>Owner's Requests</h3>
            <button
              onClick={() => navigate(`/addRequest/${id}`)} // Navigate to an Add Request page
              style={{
                padding: "5px 15px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Add Request
            </button>
          </div>
          {requests.length > 0 ? (
            requests.map((request) => (
              <div
                key={request.idrequest}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  marginBottom: "15px",
                  textAlign: "left",
                }}
              >
                <p>
                  <strong>Request ID:</strong> {request.idrequest} |{" "}
                  <strong>Property Name:</strong> {request["Property Name"]} |{" "}
                  <strong>Payment Amount:</strong> {request["Payment Amount"]} |{" "}
                  <strong>Payment Type:</strong> {request["Payment Type"]}
                </p>
                <p>
                  <strong>Service Description:</strong>{" "}
                  {request["Service Description"] || "N/A"}
                </p>
                <p>
                  <strong>Service Date:</strong>{" "}
                  {new Date(request["Service date"]).toLocaleDateString()}
                </p>
                <div>
                  <button
                      onClick={() => handleEditRequest(request.idrequest)}
                      style={{
                          padding: "5px 10px",
                          marginRight: "10px",
                          backgroundColor: "#007BFF",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "14px",
                      }}
                  >
                      Edit Request
                  </button>
                  <button
                      
                      onClick={() => navigate(`/viewBids/${request.idrequest}`)} // Navigate to View Bids page
                      style={{
                          padding: "5px 10px",
                          backgroundColor: "#FF5722",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "14px",
                      }}
                  >
                      View Bids
                  </button>
              </div>
              </div>
            ))
          ) : (
            <p>No requests found for this owner.</p>
          )}
        </div>
      );
    } catch (err) {
      
      console.error("Error fetching requests:", err.response || err.message);
      setError(true);
      setContent("Something went wrong while fetching the request data.");
    }
  };
    

  const handleOrderHistory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8800/ownerorders/${id}`); // Fetch orders by owner ID
      const orders = res.data;
  
      setContent(
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3>Owner's Orders</h3>
          </div>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.idorders}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  marginBottom: "15px",
                  textAlign: "left",
                }}
              >
                <p>
                  <strong>Property Name:</strong> {order["Property Name"]} |{" "}
                  <strong>Service Date:</strong> {new Date(order["Service date"]).toLocaleDateString()} |{" "}
                  <strong>Cleaner:</strong> {order["First Name"]} {order["Last Name"]} |{" "}
                  <strong>Phone Number:</strong> {order["Phone Number"]} |{" "}
                  <strong>Payment Amount:</strong> ${order["Payment Amount"]}
                </p>
              </div>
            ))
          ) : (
            <p>No orders found for this owner.</p>
          )}
        </div>
      );
    } catch (err) {
      console.error("Error fetching orders:", err.response || err.message);
      setError(true);
      setContent("Something went wrong while fetching the order data.");
    }
  };
  
  const handlePaymentMethods = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8800/paymentOptions/${id}`); // Fetch payment methods by owner ID
      const paymentMethods = res.data;
  
      setContent(
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3>Owner's Payment Methods</h3>
            <button
              onClick={() => navigate(`/addPaymentMethod/${id}`)} // Navigate to Add Payment Method page
              style={{
                padding: "5px 15px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Add Payment Method
            </button>
          </div>
          {paymentMethods.length > 0 ? (
            paymentMethods.map((method, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  marginBottom: "15px",
                  textAlign: "left",
                }}
              >
                <p>
                  <strong>Payment Method:</strong> {method}
                </p>
              </div>
            ))
          ) : (
            <p>No payment methods found for this owner.</p>
          )}
        </div>
      );
    } catch (err) {
      console.error("Error fetching payment methods:", err.response || err.message);
      setError(true);
      setContent("Something went wrong while fetching the payment method data.");
    }
  };
  

  //show the inital page
  const handleShowOwner = async (e) => {

    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8800/ownerView/${id}`);
      const ownersData = res.data;
      
      setOwners(ownersData);

      setContent(
  <div style={{ textAlign: "left" }}>
     <h3>Personal Information</h3>
    {ownersData.length > 0 ? (
      ownersData.map((owner) => (
        <div
          key={owner.idusers}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "15px",
            textAlign: "left",
          }}
        >
          <p><strong>First Name:</strong> {owner["First Name"]}</p>
          <p><strong>Middle Initial:</strong> {owner["Middle Initial"] || "-"}</p>
          <p><strong>Last Name:</strong> {owner["Last Name"]}</p>
          <p><strong>Email:</strong> {owner.Email}</p>
          <p><strong>Password:</strong> {owner.Password}</p>
          <p><strong>City:</strong> {owner.City || "-"}</p>
          <p><strong>Street:</strong> {owner.Street || "-"}</p>
          <p><strong>ZIP:</strong> {owner.ZIP || "-"}</p>
          <p><strong>Phone Number:</strong> {owner["Phone Number"]}</p>
          <p><strong>Gender:</strong> {owner.Gender}</p>
          <p><strong>Date of Birth:</strong> {new Date(owner["Date of Birth"]).toLocaleDateString()}</p>
          <button
            onClick={() => handleEdit(owner.idusers)}
            style={{ marginRight: "10px" }}
          >
            Edit
          </button>
        </div>
      ))
    ) : (
      <p>No owner data available.</p>
    )}

  </div>
);

    } catch (err) {
      console.error("Error fetching owners:", err);
      setError(true);
      setContent("Something went wrong while fetching the owner data.");
    }
  };


  const handleEdit = (id) => {
    navigate(`/updateOwner/${id}`);
    console.log("Edit owner with ID:", id);
  };
  const handleEditProperty = (id) => {
    navigate(`/updateProperty/${id}`);
    console.log("Edit property with ID:", id);
  };
  
  const handleEditRequest = async () => {
    setContent("No Bid history available.");
  };

  return (
    <>
    <div className="dashboard">
      <header className="header">
        <h2>Hello, Owner</h2>
        <nav className="navigation">
          <button className="nav-button" onClick={handleShowOwner}>
            Profile
          </button>
          <button className="nav-button" onClick={handleViewProperties}>
            View Property
          </button>
          <button className="nav-button" onClick={handleViewRequests}>
            View Requests
          </button>
          <button className="nav-button" onClick={handleOrderHistory}>
            Order History
          </button>
          <button className="nav-button" onClick={handlePaymentMethods}>
            Payment methods
          </button>
        </nav>
      </header>
      <main className="content">
        {typeof content === "string" ? <p>{content}</p> : content}
      </main>
    </div>
    </>
  );
};

export default OwnerView;
