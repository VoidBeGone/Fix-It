import React, { useEffect, useRef } from "react";
import { gsap } from "gsap"; // Import GSAP for animation
import "../style/SignUpForm.css";

function SignUpForm({ resetSignup, settersignedin,setAuth}) {
  const modelRef = useRef();

  const animateOut = (x) =>{
    gsap.to(modelRef.current,{opacity:0, scale:0.5, duration:0.5, ease:"sine.out"
        ,onComplete:x
    });
};


  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo(
      modelRef.current,
      { opacity: 0, scale: 0}, // Start at 0 opacity and small scale
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, // Fade in and scale up
       // Start this animation 1.5 seconds before the outer square finishes (overlapping animations)
    );

    const onClick = (event) => {
      if (modelRef && !modelRef.current.contains(event.target)) {
        animateOut(()=>{
          resetSignup();
        });
      }
    };
    document.addEventListener("mousedown", onClick);

    return () => {
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const isignedin = () =>{
    settersignedin();
    resetSignup();
    setAuth();
  }

  
  return (
    <div className="SignUpContainer">
      {/* Outer square for the spinning cube effect */}
      <div className="SignUpBox" ref={modelRef}>
        <h2>Sign Up</h2>
        <form action="/signUp" onSubmit={isignedin}>
          <div className="SignUpInput">
            <label htmlFor="fName">First Name</label>
            <input type="text" id="fName" name="fName" required></input>
          </div>

          <div className="SignUpInput">
            <label htmlFor="lName">Last Name</label>
            <input type="text" id="lName" name="lName" required></input>
          </div>

          <div className="SignUpInput">
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" required></input>
          </div>

          <div className="SignUpInput">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required></input>
          </div>

          <div className="SignUpInput">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required></input>
          </div>

          <div className="SignUpInput">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required></input>
          </div>

          <button type="submit" className="SignUpBtn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
