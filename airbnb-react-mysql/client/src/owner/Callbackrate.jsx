import React, { useState } from "react";
import RateCleaner from "./RateCleaner";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Callbackrate = () => {
  // Destructure the parameters from the URL
  const { orderId, cleanerId, ownerId } = useParams();

  console.log("Received Parameters:", { orderId, cleanerId, ownerId });

  const navigate = useNavigate();
  
  const [ratings, setRatings] = useState({
    reliability: 0,
    satisfaction: 0,
    cleanliness: 0,
  });

  const [comment, setComment] = useState("");

  // Callback to handle individual ratings
  const handleRate = (category, ratingValue) => {
    setRatings((prev) => ({
      ...prev,
      [category]: ratingValue,
    }));
  };

  // Callback to handle form submission
  const handleSubmit = async () => {
    const { reliability, satisfaction, cleanliness } = ratings;

    console.log("Ratings Submitted:", {
      orderId,
      cleanerId,
      reliability,
      satisfaction,
      cleanliness,
      comment,
    });

    try {
      const endpoint = "http://localhost:8800/submitFeedback";
      const formData = {
        orderId,
        cleanerId,
        reliability,
        satisfaction,
        cleanliness,
        comment,
      };

      // Submit the data to the backend
      const response = await axios.post(endpoint, formData);
      console.log("Response from server:", response);

      // Navigate to the owner's main view
      navigate(`/ownerView/${ownerId}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while submitting your feedback.");
    }
  };

  return (
    <div>
      <h1>Rate the Cleaner</h1>
      <RateCleaner 
        onRate={handleRate} 
        onSubmit={handleSubmit} 
        ratings={ratings} 
        setComment={setComment} 
      />
    </div>
  );
};

export default Callbackrate;
