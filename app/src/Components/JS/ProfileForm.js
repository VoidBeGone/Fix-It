import { useState,useEffect,useRef } from 'react';
import React from "react";
import "../style/ProfileForm.css";
import {gsap} from "gsap";

export default function ProfileForm({resetPU, setAuth}) {
  const [person, setPerson] = useState({
    firstName: 'Joe',
    lastName: 'Doe',
    age: '25',
    email: 'JoeDoeh@sculpture.com'
  });

    const helper2 = () =>{
      setAuth();
      resetPU();
    }
  const modelRef = useRef();

    const animateOut = (onComplete) => {
      // First, animate the background color
      gsap.to(modelRef.current, {
        backgroundColor: "white",
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(modelRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: "power2.in",
            onComplete: onComplete,
          });
        },
      });
    };

  useEffect(()=>{
    const timeline = gsap.timeline();
    timeline.fromTo(modelRef.current
      , { // Initial state (the reverse of the ending state)
        //backgroundColor: "white",
        opacity: 0,
        scale: 0.9,
      },
      { // Target state (the reverse of the starting state)
        //: "#e9e9e9", // Example color, adjust as needed
        opacity: 1,
        scale: 1,
        duration: 0.6, 
        ease: "power2.out",
      }
    );



    const onClick = (event) =>{
      if (modelRef && !modelRef.current.contains(event.target)){
        animateOut(() => {
          helper2(); 
        });        
      }
    };

    document.addEventListener("mousedown", onClick);

    return () =>{
      document.removeEventListener("mousedown", onClick);
    }
  },[]);


  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleAgeChange(e) {
    setPerson({
        ...person,
        age: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <div className="ProfileContainer">
        <div className="ProfileBox"ref={modelRef}>
            <h2>Profile Info</h2>
            <div className="ProfileInput">
                First name:
                <input
                value={person.firstName}
                onChange={handleFirstNameChange}
                />
            </div>
            <div className="ProfileInput">
                Last name:
                <input
                value={person.lastName}
                onChange={handleLastNameChange}
                />
            </div>
            <div className="ProfileInput">
                Age:
                <input
                value={person.age}
                onChange={handleAgeChange}
                />
            </div>
            <div className="ProfileInput">
                Email:
                <input
                value={person.email}
                onChange={handleEmailChange}
                />
            </div>
            <button className="ProfileBtn">Change Info</button>
        </div>
    </div>
  );
}
