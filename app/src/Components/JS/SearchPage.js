import React from "react";
import "../style/SearchPage.css";
import ServicePage from "./ServicePage.js";
import {gsap} from "gsap";

export default function SearchPage({ searched }) {
    const description = `"Description`;
    console.log(searched);
    const modelRef = React.useRef();
    React.useEffect(()=>{
        const timeline = gsap.timeline();

        timeline.fromTo(modelRef.current,
          {opacity:0.5},{opacity:1,duration:0.2, ease:"none"},  
        );
    },[searched]);
    const [serviceClicked, setServiceClicked] = React.useState(false);

    const setterServiceClick =  () =>{
        setServiceClicked(true);
    }

    const resetServiceClick = () =>{
        setServiceClicked(false);
    };
    return (
        <div>
            {serviceClicked && <ServicePage keepServicePage= {resetServiceClick}/>}
            <div className="SearchPage" ref={modelRef}>
                <div className="SearchPageContainer">
                    <div className="SearchPageContent">
                        <div className="SearchPageContentContainer" onClick ={setterServiceClick}>
                            <div className="SPCCTitle">Title</div>
                            <div className="SPCCHor">
                                <div className="SPCCImage"></div>
                                <div className="SPCCDescription">{description}</div>
                            </div>
                            <div className ="SPCCReviews">5 Stars</div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
        
    );
}
