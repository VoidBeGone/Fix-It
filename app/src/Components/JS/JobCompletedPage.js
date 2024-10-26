import React from "react";
import "../style/JobCompletedPage.css"; // Style file for simple styling

export default function JobCompletedPage() {
    // Dummy job data
    const job = {
        title: "Replace Water Heater",
        client: "Michael Davis",
        date: "2023-10-12",
        type: "Plumbing",
        location: "Toronto",
        stage: "Completed"
    };

    return (
        <div className="JobCompletedPage">
            <div className="JobCompletedContainer">
                <h1>Job Completed!</h1>
                <h2>Payment Received</h2>
                
                {/* Job Details */}
                <div className="JobDetails">
                    <h3>Job Title: {job.title}</h3>
                    <p><strong>Client:</strong> {job.client}</p>
                    <p><strong>Date:</strong> {job.date}</p>
                    <p><strong>Type:</strong> {job.type}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Status:</strong> {job.stage}</p>
                </div>

                {/* Back to Dashboard or Next Job Button */}
                <button className="BackButton" onClick={() => window.location.href = "/dashboard"}>
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}
