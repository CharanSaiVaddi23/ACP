// OurMissionPage.js
import React from 'react';
import styles from '../style/OurMissionPage.Module.css'; // Customize this with your styles

const OurMissionPage = () => {
  return (
    <div className={styles.missionPageContainer}>
      <h1>Our Mission</h1>
      <p>
        At Connect X, our mission is to bridge the gap between students and alumni, fostering a network
        where knowledge, advice, and opportunities can be shared. We believe in empowering the next generation
        of professionals by connecting them with experienced alumni who can provide valuable guidance and
        support.
      </p>
      <p>
        Through our platform, we aim to create lasting relationships, promote career growth, and strengthen the
        bond within our community.
      </p>
    </div>
  );
};

export default OurMissionPage;
