import React, { useState, useRef, useEffect } from 'react';
import "../style/UserReview.css";
import { gsap } from "gsap";

function UserReview({ resetUserReview, setHome }) {
  const modelRef = useRef();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Review Submitted:', { rating, comment });
    animateOut(() => resetUserReview()); // Close modal after submitting
  };

  const animateOut = (callback) => {
    gsap.to(modelRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
      ease: "sine.out",
      onComplete: callback
    });
  };

  useEffect(() => {
    // Animation for modal appearing
    gsap.fromTo(
      modelRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );

    // Close the modal with animation when clicking outside
    const handleOutsideClick = (event) => {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        animateOut(() => {
          resetUserReview(); // Close the review modal
        });
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [resetUserReview, setHome]);

  return (
    <div className="ReviewOverlay" onClick={() => animateOut(resetUserReview)}>
      <div className="review-card" ref={modelRef} onClick={(e) => e.stopPropagation()}>
        <h2>Rate the Constructor's Work</h2>
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

export default UserReview;
