import React, { useEffect, useRef } from "react";
import "../style/home.css";

//note the closeModal what is props 
//however since I dont want to do props.closeModal
// if you do {closeModal} you can call it directly instead 
function ScheduleModal({ closeModal }) {
    //this is becoming an instance of ModalContent
  const modalRef = useRef();

    //basically react call sthis function whenever the component stats or props change, or when it is first rendered
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
   
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);


  return (
    <div className="ModalOverlay" >
        {/*As you can see here this is connecting back the modelRef*/}
      <div className="ModalContent" ref={modalRef}>
        <h2>Pick a time</h2>
        <div className="TimeSelection">
          <label htmlFor="date">Date</label>
          <select id="date">
            <option>Today, Wed, Oct 23</option>
            <option>Tomorrow, Thu, Oct 24</option>
            {/* Add more date options here */}
          </select>

          <label htmlFor="time">Time</label>
          <select id="time">
            <option>3:45 AM - 4:15 AM</option>
            <option>4:15 AM - 4:45 AM</option>
            {/* Add more time options here */}
          </select>
        </div>
        <button className="ScheduleButton" onClick = {closeModal}>Schedule</button>
        {/*when you click this then we activate closeModal right away */}
        <button className="DeliverNowButton" onClick={closeModal}>
          Schedule now
        </button>
      </div>
    </div>
  );
}

export default ScheduleModal;
