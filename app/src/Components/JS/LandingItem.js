import "../style/landing.css";
import React from "react";

export default function LandingItem({ title, client, date, type, location, stage }) {

    const Title = {title};
    const Client = {client};
    const Date = {date};
    const Type = {type};
    const Location = {location};
    const Status = {stage};

    return (
        <div className="JobCard">
            <h3>{title}</h3>
            <p><strong>Client:</strong> {client}</p>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Type:</strong> {type}</p>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Status:</strong> {stage}</p>
        </div>
    );
}
