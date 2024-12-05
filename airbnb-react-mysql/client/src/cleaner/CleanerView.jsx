import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const CleanerView = () => {
  const [content, setContent] = useState("Welcome! Click a button to see content here.");
  const [error, setError] = useState(false);
  const { id } = useParams();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    middleInitial: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    street: "",
    zip: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8800/updateCleaner/${id}`, formData);
      setContent(
        <div>
          <p style={{ color: "green" }}>
            {res.data.message || "Profile updated successfully!"}
          </p>
        </div>
      );
      setShowUpdateForm(false); 
    } catch (err) {
      console.error(err);
      setContent(
        <div>
          <p style={{ color: "red" }}>
            Something went wrong while updating the profile.
          </p>
        </div>
      );
    }
  };

  const handleUpdateProfile = () => {
    setContent("");
    setShowUpdateForm(true); 
  };


  const handleBidding = async (idrequest) => {
    try {
      const cleanerid = id;
      await axios.post(`http://localhost:8800/cleanerBids/bidding`, { idrequest, cleanerid });
      setContent("Bid submitted successfully!");
      setTimeout(() => {
        handleCheckJobBoard(new Event('click')); 
      }, 1000);

    } catch (err) {
      console.error(err);
      setError(true);
      setContent("Something went wrong while submitting the bid.");
    }
  };
  
  // const handleUpdateCleanerTools = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.put(`http://localhost:8800/cleanerView/${id}`);
  //     setContent("Cleaner Tools updated successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     setError(true);
  //     setContent("Something went wrong while updating the cleaner tools.");
  //   }
  // };

  const handleCheckJobBoard = async (e) => {
    e.preventDefault();
    setShowUpdateForm(false);
    try {
      const res = await axios.get(`http://localhost:8800/jobBoard/${id}`);
      const jobs = res.data;
      setContent(
        <div>
          <h3>Job Board</h3>
          {jobs.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Property Name</th>
                  <th>Street</th>
                  <th>City</th>
                  <th>Type</th>
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
                    <td>{job["First Name"] || "N/A"}</td>
                    <td>{job["Last Name"] || "N/A"}</td>
                    <td>{job["Property Name"] || "N/A"}</td>
                    <td>{job.Street || "N/A"}</td>
                    <td>{job.City || "N/A"}</td>
                    <td>{job.Type || "N/A"}</td>
                    <td>
                      {job["Payment Amount"]
                        ? `$${parseFloat(job["Payment Amount"]).toFixed(2)}`
                        : "N/A"}
                    </td>
                    <td>{job["Payment Type"] || "N/A"}</td>
                    <td>{job["Service Description"] || "N/A"}</td>
                    <td>
                      {job["Service date"]
                        ? new Date(job["Service date"]).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td> 
                    <button onClick={() => handleBidding(job.idrequest)}
                      className="button">Bid
                    </button>
                  </td>
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
  
  const handleCleanerBids = async (e) => {
    e.preventDefault();
    setShowUpdateForm(false);
    try {
      const res = await axios.get(`http://localhost:8800/cleanerBids/${id}`); 
      const jobs = res.data;
      setContent(
        <div>
          <h3>Job Board</h3>
          {jobs.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Property Name</th>
                  <th>Street</th>
                  <th>City</th>
                  <th>Type</th>
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
                    <td>{job["First Name"] || "N/A"}</td>
                    <td>{job["Last Name"] || "N/A"}</td>
                    <td>{job["Property Name"] || "N/A"}</td>
                    <td>{job.Street || "N/A"}</td>
                    <td>{job.City || "N/A"}</td>
                    <td>{job.Type || "N/A"}</td>
                    <td>
                      {job["Payment Amount"]
                        ? `$${parseFloat(job["Payment Amount"]).toFixed(2)}`
                        : "N/A"}
                    </td>
                    <td>{job["Payment Type"] || "N/A"}</td>
                    <td>{job["Service Description"] || "N/A"}</td>
                    <td>
                      {job["Service date"]
                        ? new Date(job["Service date"]).toLocaleDateString()
                        : "N/A"}
                    </td>
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
    setShowUpdateForm(false);
    try {
      const res = await axios.get(`http://localhost:8800/cleanerorders/${id}`);
      const orders = res.data;
  
      setContent(
        <div>
        <h2>Orders</h2>
        {orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>cleaning_date</th>
                <th>Property Name</th>
                <th>Stree</th>
                <th>City</th>
                <th>CheckInTime</th>
                <th>Payment Amount</th>
                <th>Payment Type</th>
                <th>Service Description</th>
                <th>Owner Name</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.idorders}>
                  <td>{order.idorders}</td>
                  <td>{order['Service date'] ? new Date(order['Service date']).toLocaleDateString() : "N/A"}</td>
                  <td>{order['Property Name'] || "N/A"}</td>
                  <td>{order.Street || "N/A"}</td>
                  <td>{order.City || "N/A"}</td>
                  <td>{order.CheckInTime || "N/A"}</td>
                  <td>{order['Payment Amount'] ? `$${order['Payment Amount']}` : "N/A"}</td>
                  <td>{order['Payment Type'] || "N/A"}</td>
                  <td>{order['Service Description'] || "N/A"}</td>
                  <td>{order['First Name']} {order['Last Name']}</td>
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
    setShowUpdateForm(false);
    try {
      const res = await axios.get(`http://localhost:8800/cleanerView/${id}`); 
      const cleaner = res.data[0]; 
  
      setContent(
        <div>
          <h3>Cleaner Info</h3>
          {cleaner ? (
            <table>
              <tbody>
                <tr>
                  <th>First Name</th>
                  <td>{cleaner['First Name']}</td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>{cleaner['Last Name']}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{cleaner.Email}</td>
                </tr>
                <tr>
                  <th>Phone Number</th>
                  <td>{cleaner['Phone Number']}</td>
                </tr>
                <tr>
                  <th>City</th>
                  <td>{cleaner.City}</td>
                </tr>
                <tr>
                  <th>Street</th>
                  <td>{cleaner.Street}</td>
                </tr>
                <tr>
                  <th>ZIP</th>
                  <td>{cleaner.ZIP}</td>
                </tr>
                <tr>
                  <th>Bank Account #</th>
                  <td>{cleaner['Bank Account #']}</td>
                </tr>
                <tr>
                  <th>Cleaning Tools</th>
                  <td>{cleaner['Cleaning Tools']}</td>
                    {/* <button onClick={() => handleUpdateCleanerTools}
                      className="button">UpdateCleanerTools
                    </button> */}
                </tr>
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
          <button className="nav-button" onClick={handleCleanerBids}>
            Bid History
          </button>
          <button className="nav-button" onClick={handleOrderHistory}>
            Order History
          </button>
        </nav>
      </header>
      <main className="content">
        {showUpdateForm && (
          <div className="form">
            <h1>Update Your Profile</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Middle Initial"
                name="middleInitial"
                value={formData.middleInitial}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Street"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="ZIP"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Phone Number"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="bankAccount"
                placeholder="Bank Account #"
                value={formData.bankAccount}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="cleaningTools"
                placeholder="Cleaning Tools #"
                value={formData.cleaningTools}
                onChange={handleChange}
                required
              />
              {/* <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="cleaner">Cleaner</option>
                <option value="owner">Owner</option>
              </select> */}
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        {typeof content === "string" ? <p>{content}</p> : content}
      </main>
    </div>
  );
};

export default CleanerView;
