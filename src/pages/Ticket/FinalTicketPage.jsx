import React, { useRef } from 'react';
import './FinalTicketPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';

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

const FinalTicketPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketRef = useRef();

  const {
    movie,
    selectedDate,
    selectedTime,
    selectedTheatre,
    seats,
    price
  } = location.state || {};

  const bookingId = 'MMT' + Math.floor(Math.random() * 1000000);

  const downloadTicket = async () => {
    const canvas = await html2canvas(ticketRef.current);
    const link = document.createElement('a');
    link.download = `${movie}_ticket.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="ticket-wrapper">
      <div className="ticket-container" ref={ticketRef}>
        {/* Header: Movie Poster + Title */}
        <div className="ticket-header">
          <img
            src={movieImages[movie]}
            alt={movie}
            className="ticket-poster"
          />
          <h1 className="ticket-movie-title">{movie}</h1>
        </div>

        {/* QR Code Section */}
        <div className="ticket-qr">
          <QRCodeCanvas value={bookingId} size={150} />
        </div>

        {/* Ticket Details Split into 2 Columns */}
        <div className="ticket-details-row">
          <div className="ticket-details left-details">
            <p><strong>Booking ID:</strong> {bookingId}</p>
            <p><strong>Date & Time:</strong> {selectedDate} at {selectedTime}</p>
            <p><strong>Theatre:</strong> {selectedTheatre}, Hyderabad</p>
          </div>
          <div className="ticket-details right-details">
            <p><strong>No. of Tickets:</strong> {Array.isArray(seats) ? seats.length : seats}</p>
            <p><strong>Seats:</strong> {Array.isArray(seats) ? seats.join(', ') : seats}</p>
            <p><strong>Total Price:</strong> ₹{price}</p>
          </div>
        </div>
      </div>

      {/* Download & Navigation Buttons */}
      <div className="ticket-buttons">
        <button onClick={downloadTicket} className="btn-download">Download Ticket</button>
        <button onClick={() => navigate('/')} className="btn-home">Back to Home</button>
      </div>
    </div>
  );
};

export default FinalTicketPage;
