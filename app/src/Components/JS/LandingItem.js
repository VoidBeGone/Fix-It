import "../style/landing.css";
import React, { useState } from "react";

export default function LandingItem(jobs){
    
    // Filter jobs by active stage
    const getJobsByStage = (stage) => jobs.filter((job) => job.stage === stage);
    const [activeStage, setActiveStage] = useState("In Progress"); // Default to "In Progress"

    const Key = 1;
    const Title = "hello";
    const Client = "";
    const Date = "";
    const Type = "";
    const Location = "";
    const Stage = "";

    return (

        <div key={Key} className="JobCard">
            <h3>{Title}</h3>
            <p><strong>Client:</strong> {Client}</p>
            <p><strong>Date:</strong> {Date}</p>
            <p><strong>Type:</strong> {Type}</p>
            <p><strong>Location:</strong> {Location}</p>
            <p><strong>Status:</strong> {Stage}</p>
        </div>

        
    )
    
}