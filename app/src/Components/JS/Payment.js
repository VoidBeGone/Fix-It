import React, { useState, useRef, useEffect } from "react";
import "../style/Payment.css";
import { gsap } from "gsap";

function Payment({ resetPayment, currentService}) {
  const modelRef = useRef();
  const [paymentInfo, setPaymentInfo] = useState({
    nameOnCard: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    billingAddress: '',
    postalCode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Information Submitted:', paymentInfo);
    animateOut(() => resetPayment()); // Animate out and close modal on submit
  };

  const animateOut = (callback) => {
    gsap.to(modelRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
      ease: "sine.out",
      onComplete: callback
    });
  };

  useEffect(() => {
    // Animation for modal appearing
    gsap.fromTo(
      modelRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );

    // Close the modal with animation when clicking outside
    const handleOutsideClick = (event) => {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        animateOut(() => {
          resetPayment();
        });
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [resetPayment]);

  return (
    <div className="PaymentOverlay" onClick={() => animateOut(() => resetPayment())}>
      <div className="PaymentCard" ref={modelRef} onClick={(e) => e.stopPropagation()}>
        <h2>Payment Information</h2>

        <form onSubmit={handleSubmit}>
          <div className="PaymentInput">
            <label htmlFor="nameOnCard">Name on Card</label>
            <input
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              value={paymentInfo.nameOnCard}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="PaymentInput">
            <label htmlFor="cardNumber">Credit Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleInputChange}
              required
              pattern="\d{16}"
              maxLength="16"
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div className="input-row">
            <div className="PaymentInput half">
              <label htmlFor="expirationDate">Expiration Date</label>
              <input
                type="text"
                id="expirationDate"
                name="expirationDate"
                value={paymentInfo.expirationDate}
                onChange={handleInputChange}
                required
                placeholder="MM/YY"
              />
            </div>

            <div className="PaymentInput half">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={handleInputChange}
                required
                maxLength="3"
                placeholder="123"
              />
            </div>
          </div>

          <div className="PaymentInput">
            <label htmlFor="billingAddress">Billing Address</label>
            <input
              type="text"
              id="billingAddress"
              name="billingAddress"
              value={paymentInfo.billingAddress}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="PaymentInput">
            <label htmlFor="postalCode">Postal/ZIP Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={paymentInfo.postalCode}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="SubmitBtn">Submit Payment</button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
