import React, { useState } from 'react';
import './SeatSelectionPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import scooterImg from '../../assets/mseat.png'; 

const SeatSelectionPage = () => {
  const [selectedSeats, setSelectedSeats] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();
  const bookingDetails = location.state || {};

  const handleSelectSeats = () => {
  navigate('/visual-seats', {
    state: {
      ...bookingDetails,
      seats: selectedSeats
    }
  });
};


  return (
    <div className="seat-container">
      <h2>How Many Seats?</h2>
      <img src={scooterImg} alt="scooter" className="scooter-img" />

      <div className="seat-numbers">
        {[1, 2, 3, 4, 5, 6].map(num => (
          <button
            key={num}
            className={`seat-number ${selectedSeats === num ? 'active' : ''}`}
            onClick={() => setSelectedSeats(num)}
          >
            {num}
          </button>
        ))}
      </div>

      <hr className="divider" />

      <div className="classes">
        <div className="class-box">
          <p>FIRST CLASS</p>
          <strong>Rs. 200</strong>
          <span className="status">Filling Fast</span>
        </div>
        <div className="class-box">
          <p>SECOND CLASS</p>
          <strong>Rs. 84</strong>
          <span className="status">Filling Fast</span>
        </div>
      </div>

      <button className="select-btn" onClick={handleSelectSeats}>
        Select Seats
      </button>
    </div>
  );
};

export default SeatSelectionPage;
