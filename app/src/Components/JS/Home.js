import React, { useState, useLayoutEffect, useRef } from "react";
import "../style/home.css";
import ScheduleModal from "./ScheduleModal";
import { gsap } from "gsap";
import SplineElement from "./Spline.js";

function Home({ authentication }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const homeContainerRef = useRef(null);
  const splineRef = useRef(null); // Reference for the Spline component

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Ensure animation happens after DOM updates with useLayoutEffect
  useLayoutEffect(() => {
    const timeline = gsap.timeline();

    // Remove the shadow initially and animate it back in after opacity is fully visible
    gsap.set(homeContainerRef.current, { boxShadow: "none" });
    gsap.set(splineRef.current, { opacity: 0 }); 
    timeline
      .fromTo(
        homeContainerRef.current,
        { opacity: 0, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
        { opacity: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)", duration: 1, ease: "power2.out" }
      )
      .to(homeContainerRef.current, {
        boxShadow: "2px 4px 2px rgba(0, 0, 0, 0.4)",
        duration: 1,
      })
      .to(
        splineRef.current,
        { opacity: 1, duration: 2, ease: "sine.in" }, 
      );

    return () => {
      gsap.to(homeContainerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
      });
    };
  }, [authentication]);

  return (
    <div>
      <div className="Home">
        <div className="HomeContainer" ref={homeContainerRef}>
          <div className="HomeTitle">Order Service near you</div>

          <div className="AddressForm">
            <input type="text" className="ServiceInput" placeholder="Enter Service"/>
            <input
              type="text"
              className="AddressInput"
              placeholder="Enter delivery address"
            />

            <button className="SearchButton">Search here</button>
          </div>
              
          {isModalOpen && <ScheduleModal closeModal={closeModal} />}
        </div>
      </div>
      
      {/* Spline component with a fade-in effect */}
      <div ref={splineRef}>
        <SplineElement />
      </div>
    </div>
  );
}

export default Home;
