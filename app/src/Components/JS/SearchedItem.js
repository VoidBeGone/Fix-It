import "../style/SearchPage.css";
import React from "react";
import ServicePage from "./ServicePage.js";

export default function SearchedItem({results, someuserid}){
    const [serviceClicked, setServiceClicked] = React.useState(false);

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
        {serviceClicked && <ServicePage keepServicePage={resetServiceClick} results={results} someuserid={someuserid}/>}
        <div className="SearchPageContentContainer" onClick={setterServiceClick} serviced={results.id}>
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

