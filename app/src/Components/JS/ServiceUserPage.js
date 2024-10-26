import "../style/ServiceUserPage.css";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import ServiceItem from "./ServiceItem";
import serviceQuery from "./JasonBackEndHelp2.js";
import Payment from "./Payment.js";
import UserReview from "./UserReview.js";

export default function SearcherUserPage({
  setHome,
  backhome,
  resetcon,
  someuserid,
  paymentOpen,
  setPayment,
  resetPayment,
  UserReviewStatus,
  setUserReview,
  resetUserReview
}) {
  const [serviceResult, setServiceResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentService, setCurrentService] = useState("user");
  const modelRef = useRef();

  // Animation to close the page
  const animateOut = (callback) => {
    gsap.to(modelRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.4,
      ease: "sine.out",
      onComplete: callback,
    });
  };

  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo(
      modelRef.current,
      { scale: 0.8, opacity: 0.8 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );

    if (backhome) {
      animateOut(() => {
        resetcon();
        resetPayment();
        resetUserReview();
      });
    }
  }, [setHome, paymentOpen, UserReviewStatus]);

  useEffect(() => {
    setLoading(true);
    serviceQuery(someuserid, (results) => {
      setServiceResults(Array.isArray(results) ? results : []);
      setLoading(false);
    });
  }, [someuserid]);

  return (
    <div className="SearchUserPage">
      {paymentOpen && (
        <Payment
          resetPayment={resetPayment}
          setHome={setHome}
        />
      )}
      {UserReviewStatus && (
        <UserReview
          resetUserReview={resetUserReview}
          setHome={setHome}
        />
      )}
      {!paymentOpen && !UserReviewStatus && (
        <div className="SUPHolderContainer" ref={modelRef}>
          {loading ? (
            <div>Loading...</div>
          ) : serviceResult.length > 0 ? (
            serviceResult.map((result, index) => (
              <ServiceItem
                key={result.id || index}
                results={result}
                setPayment={setPayment}
                setCurrentService={setCurrentService}
                setUserReview={setUserReview}
              />
            ))
          ) : (
            <div>No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}
