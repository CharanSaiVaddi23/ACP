import React, { useState, useEffect } from 'react';
import styles from '../style/ProfileForm.Module.css';

const ProfileForm = ({ onSave, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    profilepic: '',
    contactinfo: '',
    ...initialData, // Populate with initial data if available
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Reset form data if initialData changes
    setFormData({
      name: '',
      bio: '',
      profilepic: '',
      contactinfo: '',
      ...initialData,
    });
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Validate form data (you can add more validations as needed)
    if (!formData.name || !formData.bio || !formData.profilepic || !formData.contactinfo) {
      setError('Please fill out all fields.');
      return;
    }
    
    // Call the onSave function passed via props to save the profile data
    onSave(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.profileForm}>
      <h3>Complete Your Profile</h3>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.formGroup}>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="profilepic">Profile Picture URL</label>
        <input
          type="text"
          id="profilepic"
          name="profilepic"
          value={formData.profilepic}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="contactinfo">Contact Info</label>
        <input
          type="text"
          id="contactinfo"
          name="contactinfo"
          value={formData.contactinfo}
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="submit" className={styles.saveButton}>Save</button>
    </form>
  );
};

export default ProfileForm;
