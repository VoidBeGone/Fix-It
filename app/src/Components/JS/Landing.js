import React, { useState } from "react";
import "../style/landing.css";
import LandingItem from "./LandingItem";

function Landing() {

      // Job stages and active stage
    const stages = ["In Progress", "Payment Pending", "Payment Received", "Completed"];
    const [activeStage, setActiveStage] = useState("In Progress"); // Default to "In Progress"

    
    return (
        <div className="ConstructorLandingPage">
            <h1>Welcome, Constructor</h1>
            <p>Here is an overview of your jobs organized by stage:</p>

            {/* Stage buttons */}
            <div className="StageButtons">
                {stages.map((stage) => (
                <button
                    key={stage}
                    className={`StageButton ${activeStage === stage ? "active" : ""}`}
                    onClick={() => setActiveStage(stage)}
                >
                    {stage}
                </button>
                ))}
                {/* Job List for the active stage */}
                <LandingItem/>
            </div>
        </div>
        
    );
}

export default Landing;