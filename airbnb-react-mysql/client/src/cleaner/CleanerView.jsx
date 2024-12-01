import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const CleanerView = () => {
  const [content, setContent] = useState("Welcome! Click a button to see content here.");
  const [error, setError] = useState(false);
  const { id } = useParams();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/cleanerView/${id}`);
      setContent("Cleaner updated successfully!");
    } catch (err) {
      console.error(err);
      setError(true);
      setContent("Something went wrong while updating the cleaner.");
    }
  };

  const handleBidHistory = async () => {
    setContent("No Bid history available.");
  };

  const handleCheckJobBoard = async (e) => {
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
      const res = await axios.get(`http://localhost:8800/cleanerorders${id}`);
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
                <th>Cleaner ID</th>
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
  

  const handleShowCleaner = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8800/cleanerView/${id}`); 
      const cleaners = res.data; 
      setContent(
        <div>
          <h3>Cleaners Info</h3>
          {cleaners.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Bank Account</th>
                </tr>
              </thead>
              <tbody>
                {cleaners.map((cleaner) => (
                  <tr key={cleaner.idcleaner}>
                    <td>{cleaner.idcleaner}</td>
                    <td>{cleaner["Bank Account #"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No cleaner data available.</p>
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
        <h2>Hello, Cleaner</h2>
        <nav className="navigation">
          <button className="nav-button" onClick={handleShowCleaner}>
            Profile
          </button>
          <button className="nav-button" onClick={handleUpdateProfile}>
            Update Profile
          </button>
          <button className="nav-button" onClick={handleCheckJobBoard}>
            Check Job Board
          </button>
          <button className="nav-button" onClick={handleBidHistory}>
            Bid History
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

export default CleanerView;
