import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

import kalkiImg from '../../assets/kalki.jpeg';
import manameyImg from '../../assets/maname.avif';
import kannappaImg from '../../assets/kanappa.avif';   
import kuberaaImg from '../../assets/kubera.jpg';     

const HomePage = () => {
  const navigate = useNavigate();

  const movies = [
    {
      title: 'Kalki 2898 AD',
      image: kalkiImg,
      description: 'Futuristic action saga blending mythology and sci-fi.'
    },
    {
      title: 'Manamey',
      image: manameyImg,
      description: 'Romantic comedy starring Sharwanand and Krithi Shetty.'
    },
    {
      title: 'Kannappa',
      image: kannappaImg,
      description: 'Epic mythological tale of devotion and valor.'
    },
    {
      title: 'Kuberaa',
      image: kuberaaImg,
      description: 'Fantasy drama surrounding the lord of wealth.'
    }
  ];

  return (
    <div className="homepage">
      <div className="hero-banner">
        <div className="hero-content">
          <h1>🎬 Welcome to Movie Magic</h1>
          <p>Book your favourite movie tickets hassle-free!</p>
        </div>
      </div>

      <div className="section">
        <h2>🎞 Now Showing in Guntur</h2>
        <div className="movie-grid">
          {movies.map((movie, index) => (
            <div className="movie-card" key={index}>
              <img src={movie.image} alt={movie.title} />
              <div className="movie-info">
                <h5>{movie.title}</h5>
                <p>{movie.description}</p>
                <button
                  className="btn-book"
                  onClick={() =>
                    navigate(`/movie-details?movie=${encodeURIComponent(movie.title)}`)
                  }
                >
                  Book Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
