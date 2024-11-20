import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Login.css';
import { space } from 'postcss/lib/list';

const LoginChoice = () => {
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

      <div className="user-login-container">
        <h1>Select Your Login Type</h1>
        <div className="choice-buttons">
          <Link to="/login/student">
            <button className="choice-button">Student Login</button>
          </Link>
          <Link to="/login/alumnus">
            <button className="choice-button">Alumnus Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginChoice;
