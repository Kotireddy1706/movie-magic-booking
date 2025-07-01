import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('user') || '');

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  const password = e.target.password.value;

  // Allow only these two users
  const validUsers = {
    krishna: 'krishna',
    kotireddy: 'kotireddy'
  };

  if (validUsers[name] && validUsers[name] === password) {
    setUsername(name);
    localStorage.setItem('user', name);
    setShowLogin(false);
  } else {
    alert('Invalid username or password. Only registered users are allowed.');
  }
};


  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    alert('Registration successful!');
    setShowSignUp(false);
    setShowLogin(true);
  };

  const handleLogout = () => {
    setUsername('');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">🎬 Movie Magic</Link>
          <div className="navbar-links">
            <Link to="/" className="nav-item">Home</Link>
            {username ? (
              <>
                <span className="welcome-msg">Welcome, {username}</span>
                <button className="btn-outline" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button className="btn-outline" onClick={() => setShowLogin(true)}>Login</button>
                <button className="btn-primary" onClick={() => setShowSignUp(true)}>Sign Up</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="auth-modal">
            <h3>Login</h3>
            <form onSubmit={handleLoginSubmit}>
              <input name="username" type="text" placeholder="Username or Email" required />
              <input name="password" type="password" placeholder="Password" required />
              <button type="submit" className="btn-book w-100 mt-2">Login</button>
            </form>
            <button className="btn-outline mt-2 w-100" onClick={() => { setShowLogin(false); setShowSignUp(true); }}>
              Don't have an account? Sign Up
            </button>
            <button className="btn-outline mt-2 w-100" onClick={() => setShowLogin(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="modal-overlay">
          <div className="auth-modal">
            <h3>Sign Up</h3>
            <form onSubmit={handleSignUpSubmit}>
              <input type="text" placeholder="First Name" name="firstName" required />
              <input type="text" placeholder="Last Name" name="lastName" required />
              <input type="text" placeholder="Username" name="username" required />
              <input type="tel" placeholder="Mobile Number" name="mobile" required />
              <input type="email" placeholder="Email Address" name="email" required />
              <input type="password" placeholder="Password" name="password" required />
              <button type="submit" className="btn-book w-100 mt-2">Sign Up</button>
            </form>
            <button className="btn-outline mt-2 w-100" onClick={() => { setShowSignUp(false); setShowLogin(true); }}>
              Already have an account? Login
            </button>
            <button className="btn-outline mt-2 w-100" onClick={() => setShowSignUp(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
