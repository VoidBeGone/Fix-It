import "../style/ServiceUserPage.css";
import React from "react";
import {gsap} from "gsap";
import ServiceItem from "./ServiceItem";


export default function SearcherUserPage({setHome, backhome, resetcon}){
    const modelRef = React.useRef();
    //add animation when leaving this page 
    const animateOut = (x) =>{
        gsap.to(modelRef.current,{opacity:0, scale:0.5, duration:0.4, 
            ease:"sine.out)",
            onComplete:x,
        });
    };
    React.useEffect(()=>{
        const timeline = gsap.timeline();
        timeline.fromTo(modelRef.current,
            {scale:0.8, opacity:0.8},
            {scale:1, opacity:1, duration:0.5,ease:"back.out(1.7)" }
        );
        if(backhome){
            console.log("BRUH");
            animateOut(()=>{
                resetcon();
            });
        }
    },[setHome])



    return (
      <div className = "SearchUserPage">
        <div className = "SUPHolderContainer"ref={modelRef}>
            <ServiceItem setHome={setHome} backhome={backhome} resetcon={resetcon}/>
            <ServiceItem setHome={setHome} backhome={backhome} resetcon={resetcon}/>
            <ServiceItem setHome={setHome} backhome={backhome} resetcon={resetcon}/>
        </div>
      </div>  
    );
}