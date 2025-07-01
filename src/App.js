import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import BookingPage from './pages/Booking/BookingPage';
import SeatSelectionPage from './pages/SeatSelection/SeatSelectionPage';
import BookingSummaryPage from './pages/Summary/BookingSummaryPage';
import PaymentPage from './pages/Payment/PaymentPage';
import FinalTicketPage from './pages/Ticket/FinalTicketPage';
import Navbar from './pages/Navbar/Navbar';
import MovieDetailsPage from './pages/MovieCard/MovieDetailsPage';
import VisualSeatLayoutPage from './pages/SeatLayout/VisualSeatLayoutPage';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/seats" element={<SeatSelectionPage />} />
        <Route path="/summary" element={<BookingSummaryPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/final-ticket" element={<FinalTicketPage />} />
        <Route path="/movie-details" element={<MovieDetailsPage />} />
        <Route path="/seat-selection" element={<SeatSelectionPage />} />
        <Route path="/visual-seats" element={<VisualSeatLayoutPage />} />

      </Routes>
    </Router>
  );
}

export default App;
