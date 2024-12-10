import React, { useState } from "react";
import RateCleaner from "./RateCleaner";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Callbackrate = () => {
  const { orderId, cleanerId, ownerId } = useParams();

  console.log("Received Parameters:", { orderId, cleanerId, ownerId });
  const navigate = useNavigate();
  
  const [ratings, setRatings] = useState({
    reliability: 0,
    satisfaction: 0,
    cleanliness: 0,
  });

  const [comment, setComment] = useState("");

  //it updates the ratings using the setState pattern
  //rating is initialized a object that holds values for different categories
  const handleRate = (category, ratingValue) => {
    setRatings((prev) => ({
      ...prev,
      [category]: ratingValue,
    }));
  };
  //handle rate inserts the category and the rating value, it receives one another another

  //submit these fields for updates
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

      const response = await axios.post(endpoint, formData);
      console.log("Response from server:", response);
      navigate(`/ownerView/${ownerId}`);
    } catch (error) {
      console.error("Error:", error);
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
