import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewBids = () => {
  const { requestId } = useParams(); // Assuming the request ID is passed as a parameter
  const [bids, setBids] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/viewBids/${requestId}`);
        setBids(res.data);
      } catch (err) {
        console.error("Error fetching bids:", err);
        setError("Something went wrong while fetching the bid data.");
      }
    };

    fetchBids();
  }, [requestId]);

  return (
    <div className="view-bidding-container">
      <header className="header">
        <h2>Bidding for Request ID: {requestId}</h2>
      </header>
      <main className="content">
        {error ? (
          <p className="error-message">{error}</p>
        ) : bids.length > 0 ? (
          bids.map((bid) => (
            <div
              key={bid.idcleaner}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "15px",
                textAlign: "left",
              }}
            >
              <p>
                <strong>Cleaner Name:</strong> {bid.firstName} |{" "}
                <strong>Payment Amount:</strong> {bid.paymentAmount} |{" "}
                <strong>Service Description:</strong> {bid.serviceDescription || "N/A"} |{" "}
                <strong>Service Date:</strong>{" "}
                {new Date(bid.serviceDate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No bids found for this request.</p>
        )}
      </main>
    </div>
  );
};

export default ViewBids;
