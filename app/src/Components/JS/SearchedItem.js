import "../style/SearchPage.css";
import React from "react";
import ServicePage from "./ServicePage.js";

export default function SearchedItem({results}){
    const [serviceClicked, setServiceClicked] = React.useState(false);

    const SERVICEID = results.id; //GET YOUR SERVICE ID HERE
    const title =results.title;
    const Image = results.image;
    const description = results.description;
    const reviews = results.reviews;

    const setterServiceClick = () => {
        setServiceClicked(true);
      };
    
      const resetServiceClick = () => {
        setServiceClicked(false);
      };

      
    return(
    <div>
        {serviceClicked && <ServicePage keepServicePage={resetServiceClick} results={results}/>}
        <div className="SearchPageContentContainer" onClick={setterServiceClick} SERVICEID={SERVICEID}>
        <div className="SPCCTitle">{title}</div>
        <div className="SPCCHor">
          <div className="SPCCImage"></div>
          <div className="SPCCDescription">{description}</div>
        </div>
        <div className="SPCCReviews"></div>
      </div>
    </div>
   );
}

