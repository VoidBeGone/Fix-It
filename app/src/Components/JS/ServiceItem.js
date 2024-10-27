import "../style/ServiceUserPage.css";
import React from "react";

export default function ServiceItem({ results, setPayment, setCurrentService, setUserReview }) {
  const title = results.title
  const description = results._id
  const Date = results.date;
  const Progress = results.status;

  // Helper function for setting up payment
  const helper2 = () => {
    setCurrentService(results.title);
    setPayment();
  };

  // Helper function for setting up review
  const helper3 = () => {
    setCurrentService(results.title);
    setUserReview();
  };

  return (
    <div className="SUPContent">
      <div className="SUPTitle">Title:{title}</div>
      <div className="SUPDescription">ID: {description}</div>
      <div className="SUPDate">Time: {Date}</div>
      <div className="SUPProgress">Progress: {Progress}</div>
      <div className="ApproveDecline">
        <button className="PayNow" onClick={helper2}>Pay Now</button>
        <div className="Approve" onClick={helper3}></div>
        <div className="Decline" onClick={helper3}></div>
      </div>
    </div>
  );
}
