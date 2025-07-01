import React, { useState } from 'react';
import './VisualSeatLayoutPage.css';
import { useLocation, useNavigate } from 'react-router-dom';

const rows = 'ABCDEFGHIJKLMNO'.split('');
const seatsPerRow = 26;

const VisualSeatLayoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { seats: seatCount, ...bookingDetails } = location.state || {};
  const [selected, setSelected] = useState([]);

  const toggleSeat = (row, num) => {
    const seatId = `${row}${num}`;
    if (selected.includes(seatId)) {
      setSelected(selected.filter(s => s !== seatId));
    } else if (selected.length < seatCount) {
      setSelected([...selected, seatId]);
    }
  };

  const getSectionLabel = (rowIndex) => {
    if (rowIndex === 0) return 'LUXURY CLASS';
    if (rowIndex === 2) return 'Rs. 200 FIRST CLASS';
    if (rowIndex === 8) return 'Rs. 84 SECOND CLASS';
    return null;
  };

  const handleContinue = () => {
  let totalPrice = 0;
  selected.forEach(seat => {
    if (seat.startsWith('A') || seat.startsWith('B')) totalPrice += 300;
    else if (seat.startsWith('C') || seat.startsWith('D')) totalPrice += 200;
    else totalPrice += 84;
  });

  navigate('/summary', {
    state: {
      ...bookingDetails,
      seats: selected,
      price: totalPrice
    }
  });
};


  return (
    <div className="visual-seat-layout">
      <h2>Select Your Seats</h2>
      <div className="seat-grid">
        {rows.map((row, rowIndex) => (
          <React.Fragment key={row}>
            {getSectionLabel(rowIndex) && (
              <div className="section-label">{getSectionLabel(rowIndex)}</div>
            )}
            <div className="seat-row">
              <span className="row-label">{row}</span>
              {[...Array(seatsPerRow)].map((_, i) => {
                const seatId = `${row}${i + 1}`;
                const isSelected = selected.includes(seatId);
                return (
                  <button
                    key={seatId}
                    className={`seat ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleSeat(row, i + 1)}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="screen-text">All eyes this way please!</div>

      <button className="continue-btn" onClick={handleContinue}>
        Continue to Summary
      </button>
    </div>
  );
};

export default VisualSeatLayoutPage;
