import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../style/home.css";

function ScheduleModal({ closeModal }) {
  const modalRef = useRef();

  // Function to animate the modal out
  const animateOut = (onComplete) => {
    // First, animate the background color
    gsap.to(modalRef.current, {
      backgroundColor: "white",
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(modalRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: "power2.in",
          onComplete: onComplete,
        });
      },
    });
  };
  

  useEffect(() => {
    const timeline = gsap.timeline();

    // Animate the modal in
    timeline.fromTo(
      modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: "power2.out" }
    );

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // Animate out when clicking outside the modal
        animateOut(closeModal);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  // This function will handle the close button click with an animation
  const handleClose = () => {
    animateOut(closeModal);
  };

  return (
    <div className="ModalOverlay">
      <div className="ModalContent" ref={modalRef}>
        <h2>Pick a time</h2>
        <div className="TimeSelection">
          <label htmlFor="date">Date</label>
          <select id="date">
            <option>Today, Wed, Oct 23</option>
            <option>Tomorrow, Thu, Oct 24</option>
          </select>

          <label htmlFor="time">Time</label>
          <select id="time">
            <option>3:45 AM - 4:15 AM</option>
            <option>4:15 AM - 4:45 AM</option>
          </select>
        </div>
        <button className="ScheduleButton" onClick={handleClose}>
          Schedule
        </button>
        <button className="DeliverNowButton" onClick={handleClose}>
          Schedule now
        </button>
      </div>
    </div>
  );
}

export default ScheduleModal;
