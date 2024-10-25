import React, { useState } from 'react';
import '../style/ConstructorReview.css'; 

function ConstructorReview() {
  // State to store rating and comment
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Handle rating change
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send this data to a backend or process it here
    console.log('Review Submitted:', { rating, comment });
    // Reset form after submission
    setRating(0);
    setComment('');
  };

  return (
    <div className="review-container">
      <div className="review-card">
        <h2>Rate the Customer</h2>

        <form onSubmit={handleSubmit}>
          <div className="rating-group">
            <label>Rating</label>
            <div className="star-rating">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={index < rating ? 'star filled' : 'star'}
                  onClick={() => handleRatingChange(index + 1)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="comment">Leave a Comment</label>
            <textarea
              id="comment"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your feedback here..."
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default ConstructorReview;
