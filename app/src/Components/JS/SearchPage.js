import React, { useState, useRef, useEffect } from "react";
import "../style/SearchPage.css";
import ServicePage from "./ServicePage.js";
import { gsap } from "gsap";

export default function SearchPage({ searched }) {
  const description = `"Description"`;
  const modelRef = useRef();
  const sortDropdownRef = useRef(); 
  const [serviceClicked, setServiceClicked] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false); // State to handle sort dropdown visibility


  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo(
      modelRef.current,
      { opacity: 0.5 },
      { opacity: 1, duration: 0.2, ease: "none" }
    );
  }, [searched]);

  const setterServiceClick = () => {
    setServiceClicked(true);
  };

  const resetServiceClick = () => {
    setServiceClicked(false);
  };

  const toggleSortOptions = () => {
    if (isSortOpen) {
      gsap.to(sortDropdownRef.current, {
        opacity: 0,
        height: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    } else {
      gsap.to(sortDropdownRef.current, {
        opacity: 1,
        height: "auto", 
        duration: 0.5,
        ease: "power2.out",
      });
    }
    setIsSortOpen(!isSortOpen);
  };

  // Handle sorting (implement sorting logic as needed)
  const handleSort = (option) => {
    console.log("Sorting by:", option);
    // Add your sorting logic here
    toggleSortOptions(); // Close dropdown after selecting
  };

  return (
    <div className="background">
      {serviceClicked && <ServicePage keepServicePage={resetServiceClick} />}
      <div className="SearchPage" ref={modelRef}>
        <div className="SPSort" onClick={toggleSortOptions}>
          Sort
        </div>
        <div
          className="SPSortDropdown"
          ref={sortDropdownRef}
          style={{ opacity: 0, height: 0, overflow: "hidden" }} 
        >
          <div className="SPSortOption" onClick={() => handleSort("Rating")}>
          Price
          </div>
          <div className="SPSortOption" onClick={() => handleSort("Price")}>
            Rating
          </div>
          <div className="SPSortOption" onClick={() => handleSort("Date")}>
            Date
          </div>
        </div>

        <div className="SearchPageContainer">
          <div className="SearchPageContent">
            <div className="SearchPageContentContainer" onClick={setterServiceClick}>
              <div className="SPCCTitle">Title</div>
              <div className="SPCCHor">
                <div className="SPCCImage"></div>
                <div className="SPCCDescription">{description}</div>
              </div>
              <div className="SPCCReviews"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
