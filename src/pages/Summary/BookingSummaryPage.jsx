import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingSummaryPage.css';

const BookingSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    movie,
    selectedTheatre,
    selectedDate,
    selectedTime,
    seats
  } = location.state || {};

  // Calculate total price
  let totalPrice = 0;
  if (Array.isArray(seats)) {
    seats.forEach(seat => {
      if (seat.startsWith('A') || seat.startsWith('B')) totalPrice += 300;
      else if (seat.startsWith('C') || seat.startsWith('D')) totalPrice += 200;
      else totalPrice += 84;
    });
  }

  const proceedToPayment = () => {
    navigate('/payment', {
      state: {
        movie,
        selectedTheatre,
        selectedDate,
        selectedTime,
        seats,
        price: totalPrice
      }
    });
  };

  const modifySeatSelection = () => {
    navigate('/seat-selection', {
      state: {
        movie,
        selectedTheatre,
        selectedDate,
        selectedTime,
        seats
      }
    });
  };

  return (
    <div className="booking-summary-container">
      <div className="summary-box">
        <h2>Booking Summary</h2>
        <p><strong>Movie:</strong> {movie || 'N/A'}</p>
        <p><strong>Theatre:</strong> {selectedTheatre || 'N/A'}</p>
        <p><strong>Date:</strong> {selectedDate || 'N/A'}</p>
        <p><strong>Time:</strong> {selectedTime || 'N/A'}</p>
        <p><strong>Seats:</strong> {seats?.length > 0 ? seats.join(', ') : 'No seats selected'}</p>
        <p><strong>Total Price:</strong> ₹{totalPrice}</p>

        <div className="button-container">
          <button className="btn-proceed" onClick={proceedToPayment}>
            Proceed to Payment
          </button>

          <div className="modify-link" onClick={modifySeatSelection}>
            Modify Seat Selection
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryPage;
