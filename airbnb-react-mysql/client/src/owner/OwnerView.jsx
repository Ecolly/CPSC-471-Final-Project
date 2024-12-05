import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const OwnerView = () => {
  const [content, setContent] = useState("Welcome! Click a button to see content here.");
  const [error, setError] = useState(false);
  const { id } = useParams();

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

  //
  const handleViewProperties = async (e) => { //see the properties they have listed > edit them if want
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8800/jobBoard`); 
      const jobs = res.data;
      setContent(
        <div>
          <h3>Job Board</h3>
          {jobs.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Owner ID</th>
                  <th>Property ID</th>
                  <th>Payment Amount</th>
                  <th>Payment Type</th>
                  <th>Service Description</th>
                  <th>Service Date</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                    <tr key={job.idrequest}>
                    <td>{job.idrequest}</td>
                    <td>{job.ownerid}</td>
                    <td>{job.propertyid}</td>
                    <td>
                        {job["Payment Amount"] !== undefined && !isNaN(job["Payment Amount"]) ? (
                        `$${parseFloat(job["Payment Amount"]).toFixed(2)}`
                        ) : (
                        "N/A"
                        )}
                    </td>
                    <td>{job["Payment Type"] || "N/A"}</td>
                    <td>{job["Service Description"] || "N/A"}</td>
                    <td>{job["Service date"] ? new Date(job["Service date"]).toLocaleDateString() : "N/A"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
          ) : (
            <p>No job data available.</p>
          )}
        </div>
      );
    } catch (err) {
      console.error(err);
      setError(true);
      setContent("Something went wrong while fetching the job data.");
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
      const res = await axios.get(`http://localhost:8800/ownerView/${id}`); 
      const owners = res.data; 
      setContent(
        <div>
          <h3>Owners Info</h3>
          {owners.length > 0 ? (
            <table>
              <thead>
                <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Middle Initial</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>City</th>
                <th>Street</th>
                <th>ZIP</th>
                <th>Phone Number</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                </tr>
              </thead>
              <tbody>
                {owners.map((owner) => (
                  <tr key={owners.idbnbowner}>
                    <td>{owner.idusers}</td>
                    <td>{owner["First Name"]}</td>
                    <td>{owner["Middle Initial"] || "-"}</td>
                    <td>{owner["Last Name"]}</td>
                    <td>{owner.Email}</td>
                    <td>{owner.Password}</td>
                    <td>{owner.City || "-"}</td>
                    <td>{owner.Street || "-"}</td>
                    <td>{owner.ZIP || "-"}</td>
                    <td>{owner["Phone Number"]}</td>
                    <td>{owner.Gender}</td>
                    <td>{new Date(owner["Date of Birth"]).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Owner data available.</p>
          )}
        </div>
      );
    } catch (err) {
      console.error(err);
      setError(true);
      setContent("Something went wrong while fetching the cleaner data.");
    }
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
          <button className="nav-button" onClick={handleRequests}>
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
