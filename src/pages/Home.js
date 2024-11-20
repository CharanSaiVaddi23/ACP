import React from 'react';
import '../style/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleJoinNowClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="container">
      <div className="nav">
        <h2>CONNECT X</h2>
        <div className="menu">
          <p>About us</p>
          <p>Our Mission</p>
          <p>Contact us</p>
        </div>
      </div>

      <div className="hero">
        <div className="hero-text">
          <h1>ALUMNI CONNECT PLATFORM</h1>
          <p>Join a Global Alumni Network and explore New opportunities</p>
          <div className="buttons">
            <button 
              className="button primary" 
              onClick={handleJoinNowClick} // Use onClick for navigation
            >
              JOIN NOW
            </button>
          </div>
        </div>

        <div className="blob-cont">
          <div className="yellow blob"></div>
          <div className="red blob"></div>
          <div className="green blob"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
