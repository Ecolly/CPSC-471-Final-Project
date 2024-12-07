import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const OwnerView = () => {
  const [error, setError] = useState(false);
  const { id } = useParams();
  const [owners, setOwners] = useState([]);
  const [content, setContent] = useState(null);

  //add button to add an owner
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/ownerView/${id}`);
      setContent("Owner updated successfully!");
    } catch (err) {
      console.error(err);
      setError(true);
      setContent("Something went wrong while updating the owner.");
    }
  };

  // see requests they posted on a property > click see bids > show all the bids by cleaner
  const handleRequests = async () => {
    setContent("No Bid history available.");
  };

  const handleViewProperties = async (e) => {
    e.preventDefault();
    console.log("Fetching properties for owner ID:", id);
    try {
      const res = await axios.get(`http://localhost:8800/propertyView/${id}`); // Fetch properties by owner ID
      const properties = res.data;
      setContent(
        <div>
          <h3>Owner's Properties</h3>
          {properties.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Street</th>
                  <th>City</th>
                  <th>ZIP</th>
                  <th>Property Name</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.idproperty}>
                    <td>{property.idproperty}</td>
                    <td>{property.Street}</td>
                    <td>{property.City}</td>
                    <td>{property.ZIP}</td>
                    <td>{property["Property Name"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No properties found for this owner.</p>
          )}
        </div>
      );
    } catch (err) {
      console.error("Error fetching properties:", err.response || err.message);
      console.error(err);
      setError(true);
      setContent("Something went wrong while fetching the property data.");
    }
  };

  //
  const handleViewRequests = async (e) => { //see the properties they have listed > edit them if want
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8800/requestsView/${id}`); // Fetch requests by owner ID
      const requests = res.data;
  
      setContent(
        <div>
          <h3>Owner's Requests</h3>
          {requests.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Property ID</th>
                  <th>Payment Amount</th>
                  <th>Payment Type</th>
                  <th>Service Description</th>
                  <th>Service Date</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.idrequest}>
                    <td>{request.idrequest}</td>
                    <td>{request.propertyid}</td>
                    <td>{request["Payment Amount"]}</td>
                    <td>{request["Payment Type"]}</td>
                    <td>{request["Service Description"] || "N/A"}</td>
                    <td>{new Date(request["Service date"]).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No requests found for this owner.</p>
          )}
        </div>
      );
    } catch (err) {
      console.error("Error fetching requests:", err.response || err.message);
      console.error(err);
      setError(true);
      setContent("Something went wrong while fetching the request data.");
    }
  };
  

  const handleOrderHistory = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/ownerorders${id}`);
      const orders = res.data;
  
      setContent(
        <div>
        <h2>Orders</h2>
        {orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Request ID</th>
                <th>Owner ID</th>
                <th>Owner ID</th>
                <th>Service Description</th>
                <th>Service Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.idorders}>
                  <td>{order.idorders}</td>
                  <td>{order.idrequest}</td>
                  <td>{order.idcleaner}</td>
                  <td>{order.idowner}</td>
                  <td>{order.service_description || "N/A"}</td>
                  <td>
                    {order.service_date
                      ? new Date(order.service_date).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders available.</p>
        )}
      </div>
  );
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setContent("Something went wrong while fetching the orders.");
    }
  };
  

  //show the inital page
  const handleShowOwner = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8800/ownerView/${id}`); // Replace with dynamic ID if needed
      const ownersData = res.data;

      setOwners(ownersData); // Update the owners state

      setContent(
        <div>
          <h3>Personal Information</h3>
          {ownersData.length > 0 ? (
            ownersData.map((owner) => (
              <div key={owner.idusers} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "15px" }}>
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
                <button onClick={() => handleEdit(owner.idusers)} style={{ marginRight: "10px" }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(owner.idusers)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No Owner data available.</p>
          )}
        </div>
      );
    } catch (err) {
      console.error("Error fetching owners:", err);
      setError(true);
      setContent("Something went wrong while fetching the owner data.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/owner/${id}`);
      alert("Owner deleted successfully!");
      setOwners(owners.filter((owner) => owner.idusers !== id)); // Update the state
    } catch (err) {
      console.error("Error deleting owner:", err);
      alert("Failed to delete owner.");
    }
  };
  const handleEdit = (id) => {
    console.log("Edit owner with ID:", id);
    // Redirect to edit page or open an inline edit form
  };
  

  return (
    <div className="dashboard">
      <header className="header">
        <h2>Hello, Owner</h2>
        <nav className="navigation">
          <button className="nav-button" onClick={handleShowOwner}>
            Profile
          </button>
          <button className="nav-button" onClick={handleUpdateProfile}>
            Update Profile
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
        </nav>
      </header>
      <main className="content">
        {typeof content === "string" ? <p>{content}</p> : content}
      </main>
    </div>
  );
};

export default OwnerView;
