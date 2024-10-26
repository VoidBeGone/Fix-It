import React, {useLayoutEffect, useRef } from "react";
import "../style/home.css";
import { gsap } from "gsap";
import SplineElement from "./Spline.js";

function Home({ authentication,backhome}) {
  const homeContainerRef = useRef(null);
  const splineRef = useRef(null); // Reference for the Spline component


  const handleSearch = (event) => {
    event.preventDefault(); 
    console.log("Hello");
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
  }, [authentication,backhome]);

  return (
    <div>
      <div className="Home">
      <div className="HomeContainer" ref={homeContainerRef}>
        <div className="HomeTitle">Order Service near you</div>

        <div className="AddressForm">
          {/* Wrap the inputs and button in a form element */}
          <form onSubmit={handleSearch}>
            <input type="text" className="ServiceInput" placeholder="Enter Service" name="service" required />
            <input
              type="text"
              className="AddressInput"
              placeholder="Enter delivery address"
              name="address"
              required
            />
            <button type="submit" className="SearchButton">Search here</button>
          </form>
        </div>
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
