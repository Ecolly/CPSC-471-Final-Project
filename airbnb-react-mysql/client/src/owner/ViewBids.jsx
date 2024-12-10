import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewBids = () => {
  const { requestId } = useParams(); //request ID is passed as a parameter
  const [bids, setBids] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/viewBids/${requestId}`);
        setBids(res.data);
        console.log(res.data); // Debugging purposes
      } catch (err) {
        console.error("Error fetching bids:", err);
        setError("Something went wrong while fetching the bid data.");
      }
    };

    fetchBids();
  }, [requestId]);

  const handleAcceptBid = async (idcleaner, idowner) => {
    try {
      console.log("Owner ID:", idowner);
      console.log("Cleaner ID:", idcleaner);
      console.log("Request ID:", requestId);

      const res = await axios.post(`http://localhost:8800/acceptBid/`, { requestId, idcleaner, idowner });

      setBids(bids.map((bid) => 
        bid.idcleaner === idcleaner ? { ...bid, accepted: true } : bid
      ));

      alert("Bid accepted!");
    } catch (err) {
      console.error("Error accepting bid:", err);
      setError("Something went wrong while accepting the bid.");
    }
  };

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
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ marginRight: "10px" }}>
                <strong>Cleaner Name:</strong> {bid.firstName} |{" "}
                <strong>Payment Amount:</strong> {bid.paymentAmount} |{" "}
                <strong>Service Description:</strong> {bid.serviceDescription || "N/A"} |{" "}
                <strong>Service Date:</strong>{" "}
                {new Date(bid.serviceDate).toLocaleDateString()} |{" "}
                <strong>Reliability:</strong> {bid.avgReliability} |{" "}
                <strong>Satisfaction:</strong> {bid.avgSatisfaction} |{" "}
                <strong>Cleanliness:</strong> {bid.avgCleanliness}
              </p>
              <button
                onClick={() => handleAcceptBid(bid.idcleaner, bid.idowner)}
                disabled={bid.accepted} // Disable button if the bid is already accepted
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {bid.accepted ? "Accepted" : "Accept"}
              </button>
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
