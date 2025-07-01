import React, { useState } from 'react';
import './PaymentPage.css';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    movie,
    selectedDate,
    selectedTime,
    selectedTheatre,
    seats,
    price
  } = location.state || {};

  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');

  const handlePayment = () => {
    if (!mobile || !email || !selectedPayment) {
      alert('Please fill all the details and select a payment method.');
      return;
    }

    alert('Payment Successful!');

    navigate('/final-ticket', {
      state: {
        movie,
        selectedDate,
        selectedTime,
        selectedTheatre,
        seats,
        price,
        mobile,
        email,
        paymentMethod: selectedPayment
      }
    });
  };

  const paymentOptions = [
    'Debit / Credit Card',
    'Quick Pay (UPI Apps)',
    'Net Banking',
    'Gift Voucher',
    'Redeem Points'
  ];

  return (
    <div className="payment-container">
      <h2 className="page-title">Complete Your Payment</h2>

      <div className="payment-section">
        <div className="payment-box summary-box">
          <h3>Booking Summary</h3>
          <p><strong>Movie:</strong> {movie}</p>
          <p><strong>Date:</strong> {selectedDate}</p>
          <p><strong>Time:</strong> {selectedTime}</p>
          <p><strong>Theatre:</strong> {selectedTheatre}</p>
          <p><strong>Seats:</strong> {Array.isArray(seats) ? seats.join(', ') : seats}</p>
          <p><strong>Total Price:</strong> ₹{price}</p>
        </div>

        <div className="payment-box contact-box">
          <h3>Contact Information</h3>
          <input
            type="text"
            className="form-control"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="payment-box">
          <h3>Select Payment Option</h3>
          <div className="payment-options-grid">
            {paymentOptions.map(option => (
              <div
                key={option}
                className={`payment-option ${selectedPayment === option ? 'selected' : ''}`}
                onClick={() => setSelectedPayment(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        <div className="paynow-container">
  <button className="btn btn-pay" onClick={handlePayment}>
    Pay Now
  </button>
</div>

      </div>
    </div>
  );
};

export default PaymentPage;
