import React, { useState } from 'react';
import { registerStudent, registerAlumni } from '../api'; // Ensure the path is correct
import { Link } from 'react-router-dom';
import '../style/Signup.css';
import styles from '../style/Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    userType: 'student',
    srn: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    jobRole: '',
    company: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); // Clear error message on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      let response;
      if (formData.userType === 'student') {
        response = await registerStudent({
          srn: formData.srn,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          department: formData.department,
        });
      } else {
        response = await registerAlumni({
          srn: formData.srn,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          jobRole: formData.jobRole,
          company: formData.company,
        });
      }
      alert('Success!'); // Success message
      // Optionally redirect or reset form here
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAboutClick = () => {
    navigate('/aboutUs'); // Navigate to the About Us page
  };

  return (
    <div className="container">
      <div className="nav">
        <h2>CONNECT X</h2>
        <div className="menu">
        <p onClick={handleAboutClick} className={styles.menuItem}>About us</p>
          <p>Our Mission</p>
          <p>Contact us</p>
        </div>
      </div>

      <div className="user-login-container">
        <h1>&nbsp;&nbsp;&nbsp;&nbsp; Sign Up &nbsp;&nbsp;&nbsp;&nbsp;</h1>
        <form onSubmit={handleSubmit}>
          <select name="userType" value={formData.userType} onChange={handleChange} required>
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
          </select>

          <input type="text" name="srn" placeholder="SRN" onChange={handleChange} required />
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />

          {formData.userType === 'student' && (
            <input type="text" name="department" placeholder="Department" onChange={handleChange} required />
          )}

          {formData.userType === 'alumni' && (
            <>
              <input type="text" name="jobRole" placeholder="Job Role" onChange={handleChange} required />
              <input type="text" name="company" placeholder="Company" onChange={handleChange} required />
            </>
          )}

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ marginTop: '1em', fontSize: '0.9em' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--button-bg)', textDecoration: 'underline' }}>Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;