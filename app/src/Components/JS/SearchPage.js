import React, { useState, useRef, useEffect } from "react";
import "../style/SearchPage.css";
import { gsap } from "gsap";
import SearchedItem from "./SearchedItem.js";
import searchQuery from "./JasonBackEndHelp.js";

export default function SearchPage({ searched }) {
  const modelRef = useRef();
  const sortDropdownRef = useRef();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // Track loading state

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

  const handleSort = (option) => {
    console.log("Sorting by:", option);
    toggleSortOptions();
  };

  // Fetch search results from backend
  useEffect(() => {
    setLoading(true); // Start loading
    searchQuery(searched, (results) => {
      setSearchResults(Array.isArray(results) ? results : []);
      setLoading(false); // End loading after results are set
    });
  }, [searched]);

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
          <div className="SPSortOption" onClick={() => handleSort("Price")}>
            Price
          </div>
          <div className="SPSortOption" onClick={() => handleSort("Rating")}>
            Rating
          </div>
          <div className="SPSortOption" onClick={() => handleSort("Date")}>
            Date
          </div>
        </div>

        <div className="SearchPageContainer">
          <div className="SearchPageContent">
            {loading ? (
              <div>Loading...</div> // Show loading text while waiting for data
            ) : searchResults.length > 0 ? (
              searchResults.map((result) => (
                <SearchedItem results={result} /> // Spread `result` props directly
              ))
            ) : (
              <div>No results found.</div> // Show fallback if no results
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
