import React, { useState } from "react";
import "../style/Payment.css";

function Payment() {
  // State to store payment information
  const [paymentInfo, setPaymentInfo] = useState({
    nameOnCard: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    billingAddress: '',
    postalCode: '',
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  // Handle form submission (for now it just logs the data)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Information Submitted:', paymentInfo);
    // Here you can add logic to submit the payment info to a backend or payment gateway
  };

  return (
    <div className="PaymentContainer">
      <div className="PaymentCard">
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

          <div className="PaymentInput">
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
