import React, { useState } from "react";
import "./StarRating.css"; // Make sure to link your CSS file

const RateCleaner = ({ onRate, onSubmit }) => {
  // State for each rating category and comment
  const [reliabilityRating, setReliabilityRating] = useState(0);
  const [satisfactionRating, setSatisfactionRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [comment, setComment] = useState(""); // Store comment

  // Separate hover states for each category
  const [hoveredReliability, setHoveredReliability] = useState(0);
  const [hoveredSatisfaction, setHoveredSatisfaction] = useState(0);
  const [hoveredCleanliness, setHoveredCleanliness] = useState(0);

  // Handle clicking on a star for rating
  const handleClick = (category, ratingValue) => {
    if (category === "reliability") {
      setReliabilityRating(ratingValue);
      onRate("reliability", ratingValue); // Call the parent function to save the rating
    } else if (category === "satisfaction") {
      setSatisfactionRating(ratingValue);
      onRate("satisfaction", ratingValue);
    } else if (category === "cleanliness") {
      setCleanlinessRating(ratingValue);
      onRate("cleanliness", ratingValue);
    }
  };

  // Handle hover over star for each category
  const handleMouseEnter = (category, ratingValue) => {
    if (category === "reliability") {
      setHoveredReliability(ratingValue);
    } else if (category === "satisfaction") {
      setHoveredSatisfaction(ratingValue);
    } else if (category === "cleanliness") {
      setHoveredCleanliness(ratingValue);
    }
  };

  // Reset hover on mouse leave for each category
  const handleMouseLeave = (category) => {
    if (category === "reliability") {
      setHoveredReliability(0);
    } else if (category === "satisfaction") {
      setHoveredSatisfaction(0);
    } else if (category === "cleanliness") {
      setHoveredCleanliness(0);
    }
  };

  // Render stars for each category
  const renderStars = (category, ratingValue, hoveredRating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star-rating ${i <= (hoveredRating || ratingValue) ? "active" : ""}`}
          onClick={() => handleClick(category, i)}
          onMouseEnter={() => handleMouseEnter(category, i)}
          onMouseLeave={() => handleMouseLeave(category)}
        >
          &#9733; {/* Unicode star symbol */}
        </span>
      );
    }
    return stars;
  };

  return (
    <div style={{ textAlign: "left" }}>
      <h2>How was your Experience?</h2>
      
      <div className="rating-category">
        <div className="category-name">Reliability</div>
        <div>{renderStars("reliability", reliabilityRating, hoveredReliability)}</div>
      </div>

      <div className="rating-category">
        <div className="category-name">Satisfaction</div>
        <div>{renderStars("satisfaction", satisfactionRating, hoveredSatisfaction)}</div>
      </div>

      <div className="rating-category">
        <div className="category-name">Cleanliness</div>
        <div>{renderStars("cleanliness", cleanlinessRating, hoveredCleanliness)}</div>
      </div>

      {/* Comment Section */}
      <div className="comment-section">
        <h3>Leave a Comment</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your feedback..."
          rows="4"
          cols="50"
        />
      </div>

      {/* Submit Button */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => onSubmit(reliabilityRating, satisfactionRating, cleanlinessRating, comment)}
          style={{
            backgroundColor: "#007BFF", // Blue color
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default RateCleaner;
