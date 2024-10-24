import React, { useState } from "react";
import "../style/home.css";
import ScheduleModal from "./ScheduleModal";
import Header from "./Header.js";
function Home() {

    //isDropDownOpen and isModalOpen are now state variables, React keeps track of there states, true or false, 
    //when value of state changes react automatically re-render the component 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  //basically isDropDownOpen is a state variable, and we are setting it to the state false at the start
  //now setIsDropDownOpen is a setter function, it allows you to set and reset isDropDownnOpen
  //so by calling setIsDropDownOpen(false) i can set isDropDownOpen to false
  const [isModalOpen, setIsModalOpen] = useState(false);

  //lets you basically click schedule now and have the dropdown for it work
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  //open the popup menu ScheduleModal
  const openModal = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false); 
  };

//need this to be able to close the Modal ScheduleModal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header/>
        <div className="Home">
        <div className="HomeContainer">
          <div className="HomeTitle">Order Service near you</div>

          <div className="AddressForm">
            <input
              type="text"
              className="AddressInput"
              placeholder="Enter delivery address"
            />

            <div className="DeliverNowDropdown">
              <button className="DropdownButton" onClick={toggleDropdown}>
                Schedule now ▼
              </button>

              {isDropdownOpen && (
                <div className="DropdownMenu">
                  <div className="DropdownItem">Schedule now</div>
                  <div className="DropdownItem" onClick={openModal}>
                    Schedule for later
                  </div>
                </div>
              )}
            </div>

            <button className="SearchButton">Search here</button>
          </div>

          <div className="SignIn">
            Or <a href="#">Sign In</a>
          </div>
          {isModalOpen && <ScheduleModal closeModal={closeModal} />}
        </div>
      </div>
    </div>
    
  );
}

export default Home;
