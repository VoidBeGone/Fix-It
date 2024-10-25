import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap"; // Import GSAP for animation
import "../style/SignUpForm.css";

function SignUpForm({ resetSignup, settersignedin}) {
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const isignedin = () =>{
      settersignedin();
      resetSignup();
  };
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('/signup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password, confirmPassword, firstName, lastName})
          }); 
          if (response.ok) {
              console.log(response.json());
              isignedin();
          } else {
              console.error(response);
              setErrorMessage(await response.text());
          }
      } catch (e) {
          console.error(e);
          setErrorMessage('error occurred with login system')
      }
  };

  
  return (
    <div className="SignUpContainer">
      {/* Outer square for the spinning cube effect */}
      <div className="SignUpBox" ref={modelRef}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="SignUpInput">
            <label htmlFor="fName">First Name</label>
            <input type="text" id="fName" name="fName" onChange={setFirstName} required></input>
          </div>

          <div className="SignUpInput">
            <label htmlFor="lName">Last Name</label>
            <input type="text" id="lName" name="lName" onChange={setLastName} required></input>
          </div>

          <div className="SignUpInput">
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" onChange={setAge} required></input>
          </div>

          <div className="SignUpInput">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={setEmail} required></input>
          </div>

          <div className="SignUpInput">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={setPassword} required></input>
          </div>

          <div className="SignUpInput">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" onChange={setConfirmPassword} required></input>
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="submit" className="SignUpBtn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
