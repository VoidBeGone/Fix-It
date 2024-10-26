import "../style/SearchPage.css";
import React from "react";
import ServicePage from "./ServicePage.js";

export default function SearchedItem({searched}){
    const [serviceClicked, setServiceClicked] = React.useState(false);

    const SERVICEID = ""; //GET YOUR SERVICE ID HERE
    const title ='TITLE';
    const Image = '';
    const description = 'PENIS';
    const reviews = '';

    const setterServiceClick = () => {
        setServiceClicked(true);
      };
    
      const resetServiceClick = () => {
        setServiceClicked(false);
      };

      
    return(
    <div>
        {serviceClicked && <ServicePage keepServicePage={resetServiceClick} SERVICEID={SERVICEID} title={title} Image={Image} description={description}
        reviews={reviews}
        />}
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

