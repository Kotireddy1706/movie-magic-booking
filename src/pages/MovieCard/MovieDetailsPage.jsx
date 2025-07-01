import React from 'react';
import './MovieDetailsPage.css';
import { useNavigate, useLocation } from 'react-router-dom';

import kalkiImg from '../../assets/kalki.jpeg';
import manameyImg from '../../assets/maname.avif';
import kannappaImg from '../../assets/kanappa.avif';
import kuberaaImg from '../../assets/kubera.jpg';

import prabhas from '../../assets/prabhas.jpeg';
import amitabh from '../../assets/amithap.webp';
import deepika from '../../assets/deepika.jpeg';
import sharwa from '../../assets/sharwanand.jpeg';
import krithi from '../../assets/krithi.jpg';
import vikas from '../../assets/vikasm.webp';
import vishnu from '../../assets/vishnu.webp';
import mohanbabu from '../../assets/mohanbabu.avif';
import ramyakrishna from '../../assets/ramyakrishna.jpeg';
import dhanush from '../../assets/dhanusg.avif';
import rashmika from '../../assets/rashmika.jpg';
import sunil from '../../assets/sunil.jpeg';

const movieData = {
  'Kalki 2898 AD': {
    title: 'Kalki 2898 AD',
    description: 'Futuristic action saga blending mythology and sci-fi.',
    banner: kalkiImg,
    language: 'Telugu',
    genre: 'Action, Sci-Fi',
    duration: '3h 15m',
    releaseDate: '27 June 2024',
    rating: 'UA',
    cast: [
      { name: 'Prabhas', image: prabhas },
      { name: 'Amitabh Bachchan', image: amitabh },
      { name: 'Deepika Padukone', image: deepika },
    ]
  },
  'Manamey': {
    title: 'Manamey',
    description: 'Romantic comedy starring Sharwanand and Krithi Shetty.',
    banner: manameyImg,
    language: 'Telugu',
    genre: 'Romance, Comedy',
    duration: '2h 28m',
    releaseDate: '7 June 2024',
    rating: 'U',
    cast: [
      { name: 'Sharwanand', image: sharwa },
      { name: 'Krithi Shetty', image: krithi },
      { name: 'Vikash', image: vikas }
    ]
  },
  'Kannappa': {
    title: 'Kannappa',
    description: 'Epic mythological tale of devotion and valor.',
    banner: kannappaImg,
    language: 'Telugu',
    genre: 'Mythology, Drama',
    duration: '2h 45m',
    releaseDate: '15 August 2024',
    rating: 'U',
    cast: [
      { name: 'Vishnu Manchu', image: vishnu },
      { name: 'Mohan Babu', image: mohanbabu },
      { name: 'Ramya Krishna', image: ramyakrishna }
    ]
  },
  'Kuberaa': {
    title: 'Kuberaa',
    description: 'Fantasy drama surrounding the lord of wealth.',
    banner: kuberaaImg,
    language: 'Telugu',
    genre: 'Fantasy, Action',
    duration: '2h 30m',
    releaseDate: '25 July 2024',
    rating: 'UA',
    cast: [
      { name: 'Dhanush', image: dhanush },
      { name: 'Rashmika Mandanna', image: rashmika },
      { name: 'Sunil', image: sunil }
    ]
  }
};

const MovieDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const movieTitle = params.get('movie');
  const movie = movieData[movieTitle];

  if (!movie) {
    return <div className="movie-detail-container">Movie not found.</div>;
  }

  const handleBookNow = () => {
    navigate('/booking', { state: { movie: movie.title } });
  };

  return (
    <div className="movie-detail-container">
      <img src={movie.banner} alt={movie.title} className="movie-banner" />
      <div className="movie-info-container">
        <h1>{movie.title}</h1>
        <p className="movie-description">{movie.description}</p>
        <ul className="movie-meta">
          <li><strong>Language:</strong> {movie.language}</li>
          <li><strong>Genre:</strong> {movie.genre}</li>
          <li><strong>Duration:</strong> {movie.duration}</li>
          <li><strong>Release Date:</strong> {movie.releaseDate}</li>
          <li><strong>Rating:</strong> {movie.rating}</li>
        </ul>

        <div className="cast-section">
          <h3>Cast</h3>
          <div className="cast-grid">
            {movie.cast.map((actor, index) => (
              <div className="cast-member" key={index}>
                <img src={actor.image} alt={actor.name} className="cast-image" />
                <p className="cast-name">{actor.name}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-book" onClick={handleBookNow}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
