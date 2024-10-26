import "../style/ServiceUserPage.css";
import React from "react";

export default function ServiceItem({results}){
    const Title = results.title;
    const Description =results.Description;
    const Date = results.Date;
    const ApproveDecline = results.ApproveDecline;

    return (
        <div className = "SUPContent" >
            <div className = "SUPTitle">{Title}</div>
            <div className="SUPDescription">Description: {Description}</div>
            <div className ="SUPDate">Time: {Date}</div>
            <div className="ApproveDecline">
            <div className = "Approve"></div>
            <div className = "Decline"></div>
            </div>
        </div>
    )
}