import React, { useState, useRef, useEffect } from "react";
import "../style/SearchPage.css";
import { gsap } from "gsap";
import SearchedItem from "./SearchedItem.js";
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
            <SearchedItem searched={searched}/>
          </div>
        </div>
      </div>
    </div>
  );
}
