import React from "react";
import "../style/ServicePage.css";
import Header from "./Header.js";

export default function ServicePage({keepServicePage}){
    const description = `Description: "The quick brown fox jumps over the lazy dog, 
    showcasing the agility and grace of its movements. 
    In the distance, the sun begins to set, casting a golden glow across the horizon. 
    Birds chirp in the trees, and a gentle breeze sways the leaves, 
    creating a peaceful atmosphere. It's one of those rare moments where time seems to slow down, 
    allowing you to appreciate the beauty of nature in its simplest form. 
    The fox pauses for a moment, glancing back as if inviting you to 
    join it on its journey into the twilight."Description: "The quick brown fox jumps over the lazy dog, 
    showcasing the agility and grace of its movements. 
    In the distance, the sun begins to set, casting a golden glow across the horizon. 
    Birds chirp in the trees, and a gentle breeze sways the leaves, 
    creating a peaceful atmosphere. It's one of those rare moments where time seems to slow down, 
    allowing you to appreciate the beauty of nature in its simplest form. 
    The fox pauses for a moment, glancing back as if inviting you to 
    join it on its journey into the twilight.Description: "The quick brown fox jumps over the lazy dog, 
    showcasing the agility and grace of its movements. 
    In the distance, the sun begins to set, casting a golden glow across the horizon. 
    Birds chirp in the trees, and a gentle breeze sways the leaves, 
    creating a peaceful atmosphere. It's one of those rare moments where time seems to slow down, 
    allowing you to appreciate the beauty of nature in its simplest form. 
    The fox pauses for a moment, glancing back as if inviting you to 
    join it on its journey into the twilight.`;

    const modelRef = React.useRef();

    React.useEffect(()=>{
        const onClicked = (event) =>{
            if (modelRef && !modelRef.current.contains(event.target)){
                keepServicePage();
            }
        };
        document.addEventListener("mousedown", onClicked);

        return () =>{
            document.removeEventListener('mousedown', onClicked);
        }
    });

    return(
        <>
        <Header/>
        <div className = "ServicePage">
            <div className="ServicePageContainer" ref={modelRef}>
                <div className = "SPTitle">Title</div>
                <div className = "SPImage"></div>
                <div className = "SPReviews">5 Stars</div>
                <div className = "SPDescription">{description}</div>
                <div className = "SPFormButton">Schedule</div>
            </div>
        </div>

        </>
    )
};