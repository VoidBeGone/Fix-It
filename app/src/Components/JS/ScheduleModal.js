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

  const handleSchedule = () => {
    const selectedDate = document.getElementById("date").value;
    const selectedTime = document.getElementById("time").value;

    console.log("Selected Date:", selectedDate);
    console.log("Selected Time:", selectedTime);

    handleClose();
  };



  return (
    <div className="ModalOverlay">
      <div className="ModalContent" ref={modalRef}>
        <h2>Pick a time</h2>
        <div className="TimeSelection">
          <label htmlFor="date">Date</label>
          <select id="date">
            <option>Saturday</option>
            <option>Sunday</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
          </select>

          <label htmlFor="time">Time</label>
          <select id="time">
            <option>9am</option>
            <option>10am</option>
            <option>11am</option>
            <option>12pm</option>
            <option>1pm</option>
            <option>2pm</option>
            <option>3pm</option>
            <option>4pm</option>
            <option>5pm</option>

          </select>
        </div>
        <button className="ScheduleButton" onClick={handleSchedule}>
          Schedule
        </button>
      </div>
    </div>
  );
}

export default ScheduleModal;
