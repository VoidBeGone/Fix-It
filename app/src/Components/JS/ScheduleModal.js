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
    //this section here is saying if we click and it is outside the modal then we exit
    //event is here so that when we put it with event listener, the event is automatically attached to the function call
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    //now we are adding an event Listener to check the function to see if we have pressed down outside 
    document.addEventListener("mousedown", handleClickOutside);

    //tthis is part of the struvcture of useEffect and is there in order to decontsruct on exit
    //this isnt run immediately since react waits for the event listener to happen first 
    //since a state change is required or a dependency change 
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);
  //this array here is a dependency array, it include thing that react watches so that when these dependency changes react 
  //run this effect

  //example [] makes it only run once 
  //no array like useEffect(()=>{}); make it run after every render(also bad)

  //so right now are useEffect is depended on the closeModal function

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
        <button className="ScheduleButton">Schedule</button>
        {/*when you click this then we activate closeModal right away */}
        <button className="DeliverNowButton" onClick={closeModal}>
          Schedule now
        </button>
      </div>
    </div>
  );
}

export default ScheduleModal;
