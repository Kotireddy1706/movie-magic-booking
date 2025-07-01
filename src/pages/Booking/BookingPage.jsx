import React, { useState } from 'react';
import './BookingPage.css';
import { useNavigate, useLocation } from 'react-router-dom';

import kalkiImg from '../../assets/kalki.jpeg';
import manameyImg from '../../assets/maname.avif';
import kannappaImg from '../../assets/kanappa.avif';   
import kuberaaImg from '../../assets/kubera.jpg';   

const movieImages = {
  'Kalki 2898 AD': kalkiImg,
  'Manamey': manameyImg,
  'Kannappa': kannappaImg,
  'Kuberaa': kuberaaImg
};

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const movie = location.state?.movie || 'Movie';

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTheatre, setSelectedTheatre] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleContinue = () => {
    if (selectedDate && selectedTheatre && selectedTime) {
      navigate('/seat-selection', {
        state: { movie, selectedDate, selectedTheatre, selectedTime }
      });
    } else {
      alert('Please select date, theatre and time');
    }
  };

  const getNextDates = (days) => {
    const result = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      result.push(futureDate.toISOString().split('T')[0]);
    }
    return result;
  };

  const dates = getNextDates(4);
  const theatres = ['Cine Prime', 'GS', 'PVR', 'JLE', 'Cine Square'];
  const times = ['11:45 AM', '2:45 PM', '6:45 PM', '9:45 PM'];

  return (
    <div className="booking-container">
      <div className="movie-banner-section">
        <img src={movieImages[movie]} alt={movie} className="booking-movie-banner" />
        <h2 className="movie-title">{movie}</h2>
      </div>

      <div className="booking-section">
        <h5>Select Date:</h5>
        <div className="options scroll-x">
          {dates.map(date => (
            <button
              key={date}
              className={selectedDate === date ? 'selected' : ''}
              onClick={() => {
                setSelectedDate(date);
                setSelectedTheatre('');
                setSelectedTime('');
              }}>
              {date}
            </button>
          ))}
        </div>
      </div>

      <hr className="section-divider" />

      <div className="booking-section">
        <h5>Select Theatre and Time:</h5>
        {theatres.map(theatre => (
          <div key={theatre} className="theatre-block">
            <h6 className="theatre-name">{theatre}</h6>
            <div className="options">
              {times.map(time => (
                <button
                  key={theatre + time}
                  className={selectedTheatre === theatre && selectedTime === time ? 'selected' : ''}
                  onClick={() => {
                    setSelectedTheatre(theatre);
                    setSelectedTime(time);
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="btn-container">
        <button className="continue-btn" onClick={handleContinue}>
          Continue to Seat Selection
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
