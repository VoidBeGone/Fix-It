import React, { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap"; 
import "../style/MenuPopOut.css";
export default function MenuPopOut({
  resetPopOut,
  setLogin,
  setSignup,
}) {





  const modelRef = useRef();
  const hasAnimatedRef = useRef(false); // Track if the menu has been animated

  const handleCloseWithAnimation = useCallback(() => {
    gsap.to(modelRef.current, {
      x: "-100%",
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        resetPopOut(); 
      },
    });
  }, [resetPopOut]); 

  useEffect(() => {
    if (!hasAnimatedRef.current) {
      gsap.fromTo(
        modelRef.current,
        { x: "-100%" }, 
        { x: "0%", duration: 0.5, ease: "power2.out" }
      );
      hasAnimatedRef.current = true;
    }
  }, []); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        handleCloseWithAnimation();
      }
    };
      document.addEventListener("mousedown", handleClickOutside);


    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCloseWithAnimation]); 

  return (
    <div>
      <div className="MenuPopOut" ref={modelRef}>
        <div className="MenuPopOutContainer">
          <div className="MPOSignIn" onClick={setSignup}>
            SignUp
          </div>
          <div className="MPOLogIn" onClick={setLogin}>
            LogIn
          </div>
          <div className="MPOHistory">History</div>
          <div className="MPOService">Services</div>
          <div className="MPOAddService">Add Service</div>
        </div>
      </div>
    </div>
  );
}
