import React from "react";
import { gsap } from "gsap";
import "../style/MenuPopOut.css";

export default function MenuPopOut({
  resetPopOut,
  login,
  signin,
  setLogin,
  resetLogin,
  setSignup,
  resetSignUp,
}) {
  const modelRef = React.useRef();

  // Run the animation only once when the component is mounted
  React.useEffect(() => {
    gsap.fromTo(
      modelRef.current,
      { x: "-100%" },
      { x: "0%", duration: 0.5, ease: "power2.out" }
    );
  }, []); 

  const handleCloseWithAnimation = () => {
    gsap.to(modelRef.current, {
      x: "-100%",
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        resetPopOut(); 
      },
    });
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        handleCloseWithAnimation();
      }
    };
    if (!login && !signin) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [login, signin]);

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
