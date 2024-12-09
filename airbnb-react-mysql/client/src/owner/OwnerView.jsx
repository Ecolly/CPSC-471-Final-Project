import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./OwnerProfile.css";

const OwnerView = () => {
  const [error, setError] = useState(false);
  const { id } = useParams();
  const [owners, setOwners] = useState([]);
  const [ownerFname, setOwnersFirstName] = useState(null)
  const [content, setContent] = useState(null);
  const navigate = useNavigate(); 
  const [currentSection, setCurrentSection] = useState('profile'); 



  const handleViewProperties = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8800/propertyView/${id}`); // Fetch properties by owner ID
      const properties = res.data;
      console.log(res.data); 

      setContent(
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3>Your Properties</h3>
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
            <h3>Your Requests</h3>
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
      console.log(orders);
      setContent(
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3>Your Orders</h3>
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
                  display: "flex",
                  justifyContent: "space-between", // Add space between order details and button
                  alignItems: "center", // Align items vertically
                }}
              >
                <p style={{ flex: 1 }}>
                  <strong>Property Name:</strong> {order["Property Name"]} |{" "}
                  <strong>Service Date:</strong>{" "}
                  {new Date(order["Service date"]).toLocaleDateString()} |{" "}
                  <strong>Cleaner:</strong> {order["First Name"]}{" "}
                  {order["Last Name"]} |{" "}
                  <strong>Phone Number:</strong> {order["Phone Number"]} |{" "}
                  <strong>Payment Amount:</strong> ${order["Payment Amount"]}
                </p>
  
                {/* Complete Button */}
                <button
                  onClick={() => handleCompleteOrder(order.idorders, order.idcleaner, order.idowner)}
                  style={{
                    backgroundColor: "#4CAF50", // Green color
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                    transition: "background-color 0.3s", // Smooth transition
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")} // Change on hover
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")} // Reset on hover out
                >
                  Complete
                </button>
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
  
  //insert the order ID and the ownerId/cleanerid into the table
  const handleCompleteOrder = async (orderId, cleanerId, ownerId) => {
    console.log("Complete Order ID:", orderId);
  
    try {
      // Sending the orderId to the backend to add it to the transaction table
      const res = await axios.post(`http://localhost:8800/completeOrder`, { orderId, cleanerId, ownerId});
  
      console.log("Order completed:", res.data);
      alert("Order has been completed successfully!");
      
    } catch (err) {
      console.error("Error completing order:", err);
      alert("Failed to complete the order.");
    }
  };


  //set transaction
  const handleTransactions = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8800/ownertransactions/${id}`); // Fetch transactions by owner ID
      const transactions = res.data;
  
      setContent(
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3>Your Transactions</h3>
          </div>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div
                key={transaction.idorders}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  marginBottom: "15px",
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between", // Space between transaction details and button
                  alignItems: "center", // Align items vertically
                }}
              >
                <p style={{ flex: 1 }}>
                  <strong>Order ID:</strong> {transaction.idorders} |{" "}
                  <strong>Property Name:</strong> {transaction["Property Name"]} |{" "}
                  <strong>Service Date:</strong>{" "}
                  {new Date(transaction["Service date"]).toLocaleDateString()} |{" "}
                  <strong>Cleaner:</strong> {transaction["First Name"]}{" "}
                  {transaction["Last Name"]} |{" "}
                  <strong>Owner ID:</strong> {transaction.idowner} |{" "}
                  <strong>Payment Amount:</strong> ${transaction["Payment Amount"]}
                </p>
  
                {/* Rate Button */}
                <button
                  onClick={() => handleRate(transaction.idorders, transaction.idcleaner, transaction.idowner)}
                  style={{
                    backgroundColor: "#007BFF", // Blue background color
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                    transition: "background-color 0.3s", // Smooth transition for hover effect
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")} // Change on hover
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")} // Reset hover color
                >
                  Rate the cleaner
                </button>
              </div>
            ))
          ) : (
            <p>No transactions found for this owner.</p>
          )}
        </div>
      );
    } catch (err) {
      console.error("Error fetching transactions:", err.response || err.message);
      setError(true);
      setContent("Something went wrong while fetching the transaction data.");
    }
  };
  
  // Handle Rate (for demonstration)
  const handleRate = (orderId, cleanerId, ownerId) => {
    console.log("Rate Order ID:", orderId);
    console.log("Rate cleaner ID:", cleanerId);
    console.log("Rate owner ID:", ownerId);
    navigate(`/callRateCleaner/${orderId}/${cleanerId}/${ownerId}`);
  };
  
  const handlePaymentMethods = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8800/paymentInfo/${id}`); // Fetch payment methods by owner ID
      const paymentMethods = res.data;
      console.log(res.data);
  
      setContent(
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3>Your Payment Methods</h3>
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
                  <strong>Payment Method:</strong> {method.PaymentType} <br />
                  <strong>Account Number:</strong> {method.AccountNumber}
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
      setOwnersFirstName()

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
    navigate(`/updateRequest/${id}`);
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
          <button className="nav-button" onClick={handleTransactions}>
            Transactions
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
