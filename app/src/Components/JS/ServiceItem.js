import "../style/ServiceUserPage.css";
import React from "react";

export default function ServiceItem({setHome, backHome, resetcon}){
    const Title = "Title";
    const Description = "Description";
    const Date = "2024-10-25";
    const ApproveDecline = "";

    return (
        <div className = "SUPContent" >
            <div className = "SUPTitle">Title</div>
            <div className="SUPDescription">Description: </div>
            <div className ="SUPDate">Time: </div>
            <div className="ApproveDecline">
            <div className = "Approve"></div>
            <div className = "Decline"></div>
            </div>
        </div>
    )
}