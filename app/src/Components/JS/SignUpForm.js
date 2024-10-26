import React, { useEffect, useRef, useState } from "react";
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

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Contractor');
  const [errorMessage, setErrorMessage] = useState('');

  const isignedin = () =>{
    settersignedin();
    resetSignup();
    setAuth();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    
    const userType = (role) === 'Contractor' ? 'contractor' : 'client';

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ firstName, lastName, email, password, confirmPassword, userType})
      });

      if (response.ok) {
        console.log(response.json());
        isignedin();
      } else {
        console.error(response);
        setErrorMessage(await response.text());
      }
    } catch (e) {
      console.log(e);
      setErrorMessage('error occured with signup system');
    }
  }
  
  return (
    <div className="SignUpContainer">
      {/* Outer square for the spinning cube effect */}
      <div className="SignUpBox" ref={modelRef}>
        <h2>Sign Up</h2>
        <form method="POST" action="/signUp" onSubmit={handleSubmit}>
          <div className="SignUpInput">
            <label htmlFor="fName">First Name</label>
            <input type="text" id="fName" name="fName" onChange={(e) => setFirstName(e.target.value)} required></input>
          </div>

          <div className="SignUpInput">
            <label htmlFor="lName">Last Name</label>
            <input type="text" id="lName" name="lName" onChange={(e) => setLastName(e.target.value)} required></input>
          </div>


          <div className="SignUpInput">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required></input>
          </div>

          <div className="SignUpInput">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required></input>
          </div>

          <div className="SignUpInput">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} required></input>
          </div>

          <div className="SignUpInput">
            <label htmlFor="role">Role</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option>Contractor</option>
              <option>Client</option>
            </select>
          </div>

          <button type="submit" className="SignUpBtn">Sign Up</button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default SignUpForm;