import React, { useState, useEffect } from "react";
import "../style/landing.css";
import LandingItem from "./LandingItem";
import { fetchJobs } from "./LandingBackendHelp"; // Import the API call function

export default function Landing() {
    const [jobs, setJobs] = useState([]); // Initialize with an empty array
    const [activeStage, setActiveStage] = useState("In Progress");
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track error state

    const stages = ["In Progress", "Payment Pending", "Payment Received", "Completed"];

    useEffect(() => {
        async function loadJobs() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchJobs(activeStage); // Fetch jobs by stage from the backend
                setJobs(data); // Set fetched jobs in state
            } catch (error) {
                setError("Could not load jobs.");
            } finally {
                setLoading(false);
            }
        }

        loadJobs();
    }, [activeStage]); // Fetch jobs whenever activeStage changes

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

            {/* Display loading, error, or job list */}
            <div className="JobStageSection">
                <h2>{activeStage}</h2>
                <div className="JobList">
                    {loading ? (
                        <p>Loading jobs...</p>
                    ) : error ? (
                        <p className="ErrorMessage">{error}</p>
                    ) : jobs.length > 0 ? (
                        jobs.map((job) => (
                            <LandingItem
                                key={job.id}
                                title={job.title}
                                client={job.client}
                                date={job.date}
                                type={job.type}
                                location={job.location}
                                stage={job.stage}
                            />
                        ))
                    ) : (
                        <p className="NoJobs">No jobs in this stage</p>
                    )}
                </div>
            </div>
        </div>
    );
}
