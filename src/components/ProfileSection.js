import React, { useState } from 'react';
import axios from 'axios';
import styles from '../style/ProfileSection.css';

const ProfileSection = () => {
  const [bio, setBio] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const studentId = sessionStorage.getItem('student_srn');

  const handleProfileUpdate = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('bio', bio);
      formData.append('contactInfo', contactInfo);
      if (profilePic) formData.append('profilePic', profilePic);

      const response = await axios.put(`/profile/update/${studentId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.profileSection}>
      <h2>Update Profile</h2>

      <input
        type="text"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Enter Bio"
      />
      <input
        type="text"
        value={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
        placeholder="Enter Contact Info"
      />
      <input
        type="file"
        onChange={(e) => setProfilePic(e.target.files[0])}
      />
      <button onClick={handleProfileUpdate} disabled={loading}>
        {loading ? 'Updating...' : 'Update Profile'}
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default ProfileSection;
