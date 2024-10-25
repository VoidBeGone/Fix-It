import React, { useState } from "react";
import "../style/landing.css";

function Landing() {
  // Sample job data with various stages
  const [jobs] = useState([
    { id: 1, title: "Fix leaky faucet", client: "John Doe", stage: "Payment Pending" },
    { id: 2, title: "Install new lighting", client: "Jane Smith", stage: "Payment Received" },
    { id: 3, title: "Paint living room", client: "Mark Brown", stage: "In Progress" },
    { id: 4, title: "Bathroom renovation", client: "Sarah Wilson", stage: "Completed" },
    { id: 5, title: "Replace water heater", client: "Michael Davis", stage: "Payment Pending" },
  ]);

  // Job stages and active stage
  const stages = ["In Progress", "Payment Pending", "Payment Received", "Completed"];
  const [activeStage, setActiveStage] = useState("In Progress"); // Default to "In Progress"

  // Filter jobs by active stage
  const getJobsByStage = (stage) => jobs.filter((job) => job.stage === stage);

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
      </div>

      {/* Job List for the active stage */}
      <div className="JobStageSection">
        <h2>{activeStage}</h2>
        <div className="JobList">
          {getJobsByStage(activeStage).length > 0 ? (
            getJobsByStage(activeStage).map((job) => (
              <div key={job.id} className="JobCard">
                <h3>{job.title}</h3>
                <p><strong>Client:</strong> {job.client}</p>
                <p><strong>Status:</strong> {job.stage}</p>
              </div>
            ))
          ) : (
            <p className="NoJobs">No jobs in this stage</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Landing;
