import React from "react";
import "../style/ServicePage.css";
import ScheduleModal from "./ScheduleModal.js";
import {gsap} from "gsap";
 
export default function ServicePage({keepServicePage, results,someuserid}){


    const SERVICEID = results.id; 
    const title =results.title;
    const Image = results.image;
    const description = results.description;
    const reviews = results.reviews;
    const modelRef = React.useRef();

    const [serviceSchedule, setterServiceSchedule] = React.useState(false);

    const setServiceSchedule =() =>{
        setterServiceSchedule(true);
    };

    const resetServiceSchedule = () =>{
        setterServiceSchedule(false);
    };

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
            duration: 0.2,
            ease: "power2.in",
            onComplete: onComplete,
          });
        },
      });
    };
    React.useEffect(()=>{
      const timeline = gsap.timeline();

      timeline.fromTo(modelRef.current,
        {opacity:0.7},{opacity:1,duration:0.5,ease:"power2.in"},
      );
    },[]);
    React.useEffect(() => {
        const onClicked = (event) => {
          if (modelRef.current && !modelRef.current.contains(event.target)) {
            animateOut(() => keepServicePage(false));
          }
        };
    
        if (!serviceSchedule) {
          document.addEventListener("mousedown", onClicked);
        }
    
        return () => {
          document.removeEventListener("mousedown", onClicked);
        };
      }, [keepServicePage, serviceSchedule]); 
    
    return(
        <>
        {serviceSchedule && <ScheduleModal closeModal = {resetServiceSchedule} serviceID={results.id} someuserid={someuserid}/>}
        <div className = "ServicePage">
            <div className="ServicePageContainer" ref={modelRef} serviced={results.id}>
                <div className = "SPTitle">{title}</div>
                <div className = "SPImage"></div>
                <div className = "SPReviews"></div>
                <div className = "SPDescription">{description}</div>
                <div className = "SPFormButton" onClick={setServiceSchedule}>Schedule</div>
            </div>
        </div>

        </>
    )
};