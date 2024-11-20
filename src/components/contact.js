// src/pages/ContactPage.js
import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <div className="container mt-5">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea name="message" className="form-control" rows="4" onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
};

export default ContactPage;
