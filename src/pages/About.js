import React from 'react';
import '../style/About.css';

const About = () => {
  return (
    <div className="container">
      {/* Navigation */}
      <div className="nav">
        <h2>CONNECT X</h2>
        <div className="menu">
          <p>About us</p>
          <p>Our Mission</p>
          <p>Contact us</p>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <div className="about-header">
          <h1>ABOUT US</h1>
          <p className="subtitle">Building Bridges Between Alumni</p>
        </div>

        <div className="about-content">
          <div className="about-card">
            <h3>Who We Are</h3>
            <p>
              ConnectX is a pioneering alumni networking platform designed to bridge the gap
              between graduates across generations. We believe in the power of connections
              and the endless possibilities they create.
            </p>
          </div>

          <div className="about-card">
            <h3>Our Vision</h3>
            <p>
              To create the world's most vibrant and supportive alumni community, where
              experiences are shared, opportunities are created, and lasting connections
              are forged.
            </p>
          </div>

          <div className="about-card">
            <h3>What We Do</h3>
            <p>
              We provide a dynamic platform for alumni to connect, collaborate, and grow
              together. Through our network, members can access mentorship opportunities,
              career resources, and exclusive events.
            </p>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <h4>10K+</h4>
            <p>Active Alumni</p>
          </div>
          <div className="stat-card">
            <h4>500+</h4>
            <p>Universities</p>
          </div>
          <div className="stat-card">
            <h4>50+</h4>
            <p>Countries</p>
          </div>
        </div>
      </div>

      {/* Noise Filter SVG */}
      <svg className="noise-filter">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            stitchTiles="stitch"
          />
          <feColorMatrix
            in="colorNoise"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
          <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
          <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
        </filter>
      </svg>
    </div>
  );
};

export default About;
