import React from "react";
import "../style/ServicePage.css";
import ScheduleModal from "./ScheduleModal.js";

export default function ServicePage({keepServicePage}){
    const description = `Description`;

    const modelRef = React.useRef();
    const [serviceSchedule, setterServiceSchedule] = React.useState(false);

    const setServiceSchedule =() =>{
        setterServiceSchedule(true);
    };

    const resetServiceSchedule = () =>{
        setterServiceSchedule(false);
    };

    React.useEffect(() => {
        const onClicked = (event) => {
          if (modelRef.current && !modelRef.current.contains(event.target)) {
            keepServicePage();
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
        {serviceSchedule && <ScheduleModal closeModal = {resetServiceSchedule}/>}
        <div className = "ServicePage">
            <div className="ServicePageContainer" ref={modelRef}>
                <div className = "SPTitle">Title</div>
                <div className = "SPImage"></div>
                <div className = "SPReviews">5 Stars</div>
                <div className = "SPDescription">{description}</div>
                <div className = "SPFormButton" onClick={setServiceSchedule}>Schedule</div>
            </div>
        </div>

        </>
    )
};