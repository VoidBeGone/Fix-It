import { useState,useEffect,useRef } from 'react';
import React from "react";
import "../style/ProfileForm.css";
import {gsap} from "gsap"; 
import { application } from 'express';

export default async function ProfileForm({resetPU}) {
  const userData = await(fetch('/api/me').then( async (res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log(await res.text);
      throw new Error("error getting me");
    }
  }))
  const [person, setPerson] = useState({
    firstName: userData.profile.firstName,
    lastName: userData.profile.lastName,
    age: userData.profile.age,
    email: userData.email
  });
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
          resetPU(); 
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

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const body = {
        profile: {
            firstName: person.firstName || null, // Handle null values
            lastName: person.lastName || null,
            age: person.age || null,
        },
        email: person.email || null,
    };

    fetch('/api/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body), // Convert the object to a JSON string
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response if needed
    })
    .then((data) => {
        // Handle the response data here
        console.log('User updated successfully:', data);
    })
    .catch((error) => {
        console.error('Error updating user:', error);
    });
  }


  return (
    <div className="ProfileContainer">
        <form className="ProfileBox" method="PATCH" onSubmit={handleSubmit} ref={modelRef}>
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
            <button type="submit" className="ProfileBtn">Change Info</button>
        </form>
    </div>
  );
}
