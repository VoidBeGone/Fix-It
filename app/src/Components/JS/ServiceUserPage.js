import "../style/ServiceUserPage.css";
import React from "react";
import {gsap} from "gsap";
import ServiceItem from "./ServiceItem";
import serviceQuery from "./JasonBackEndHelp2.js";


export default function SearcherUserPage({setHome, backhome, resetcon, someuserid}){

    const [serviceResult, setServiceResults] = React.useState([]); // Initialize with an empty array
    const [loading, setLoading] = React.useState(true); // Track loading state

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

  React.useEffect(() => {
    setLoading(true); // Start loading
    serviceQuery(someuserid, (results) => {
        setServiceResults(Array.isArray(results) ? results : []);
      setLoading(false); // End loading after results are set
    });
  }, [someuserid]);


    return (
      <div className = "SearchUserPage">
        <div className = "SUPHolderContainer"ref={modelRef}>
        {loading ? (
              <div>Loading...</div> // Show loading text while waiting for data
            ) : serviceResult.length > 0 ? (
                serviceResult.map((result, index) => (
                <ServiceItem key={result.id || index} results={result} /> // Spread `result` props directly
              ))
            ) : (
              <div>No results found.</div> // Show fallback if no results
            )}
        </div>
      </div>  
    );
}