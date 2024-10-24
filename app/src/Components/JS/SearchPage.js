import React from "react";
import "../style/SearchPage.css";
import Header from "./Header.js"
import ServicePage from "./ServicePage.js";

export default function SearchPage({ searched }) {
    const description = `Description: "The quick brown fox jumps over the lazy dog, 
    showcasing the agility and grace of its movements. 
    In the distance, the sun begins to set, casting a golden glow across the horizon. 
    Birds chirp in the trees, and a gentle breeze sways the leaves, 
    creating a peaceful atmosphere. It's one of those rare moments where time seems to slow down, 
    allowing you to appreciate the beauty of nature in its simplest form. 
    The fox pauses for a moment, glancing back as if inviting you to 
    join it on its journey into the twilight."`;
    
    const [serviceClicked, setServiceClicked] = React.useState(false);

    const setterServiceClick =  () =>{
        setServiceClicked(true);
    }

    const resetServiceClick = () =>{
        setServiceClicked(false);
    };
    return (
        <div>
            <Header/>
            {serviceClicked && <ServicePage keepServicePage= {resetServiceClick}/>}
            <div className="SearchPage">
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
