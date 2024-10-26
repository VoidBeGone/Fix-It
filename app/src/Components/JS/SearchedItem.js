import "../style/SearchPage.css";
import React from "react";
import ServicePage from "./ServicePage.js";

export default function SearchedItem({searched}){
    const [serviceClicked, setServiceClicked] = React.useState(false);

    const SERVICEID = ""; //GET YOUR SERVICE ID HERE
    const setterServiceClick = () => {
        setServiceClicked(true);
      };
    
      const resetServiceClick = () => {
        setServiceClicked(false);
      };

      
    return(
    <div>
        {serviceClicked && <ServicePage keepServicePage={resetServiceClick} SERVICEID={SERVICEID}/>}
        <div className="SearchPageContentContainer" onClick={setterServiceClick} SERVICEID={SERVICEID}>
        <div className="SPCCTitle">Title</div>
        <div className="SPCCHor">
          <div className="SPCCImage"></div>
          <div className="SPCCDescription">Penis</div>
        </div>
        <div className="SPCCReviews"></div>
      </div>
    </div>
   );
}

