// import React, { useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { loginUser } from '../api';
// import '../style/Login.css'; // Ensure the CSS file has your desired styles

// const UserLogin = () => {
//   const { userType } = useParams(); // Either 'student' or 'alumni'
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     srn: '',
//     password: '',
//   });

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await loginUser({ ...formData, userType });
//       // alert(response.user.srn); // Display success message

//       console.log(response); // Log the full response to check if SRN is there

//       // Store SRN in sessionStorage for student or alumnus
//       sessionStorage.setItem(`${userType}_srn`, response.user.srn || response.user.A_SRN);
//       alert(response.user.srn)

//       // Redirect based on userType (student or alumni)
//       navigate(userType === 'student' ? '/student' : '/alumni');
//     } catch (error) {
//       alert(error.response?.data || 'Login failed'); // Show error message on failure
//     }
//   };

//   return (
//     <div className="container">
//       <div className="nav">
//         <h2>CONNECT X</h2>
//         <div className="menu">
//           <p>About us</p>
//           <p>Our Mission</p>
//           <p>Contact us</p>
//         </div>
//       </div>

//       <div className="user-login-container">
//         <h1>{userType === 'student' ? 'Student Login' : 'Alumnus Login'}</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="srn"
//             placeholder="SRN"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//         <p style={{ marginTop: '1em', fontSize: '0.9em' }}>
//           Don't have an account? <Link to="/signup" style={{ color: '#EDB74D', textDecoration: 'underline' }}>Sign Up</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;


import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../style/Login.css';
import styles from '../style/Login.css';

const UserLogin = () => {
  const { userType } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    srn: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Store SRN directly from form data
      sessionStorage.setItem(`${userType}_srn`, formData.srn);
      
      // Log for debugging
      console.log('Form submitted:', {
        srn: formData.srn,
        userType: userType
      });
      alert('Login Success!')
      // Navigate to appropriate dashboard
      navigate(userType === 'student' ? '/student' : '/alumni');
      
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
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
        <h1>{userType === 'student' ? 'Student Login' : 'Alumnus Login'}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="srn"
            placeholder="SRN"
            onChange={handleChange}
            value={formData.srn}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <button type="submit">Login</button>
        </form>
        
        <p style={{ marginTop: '1em', fontSize: '0.9em' }}>
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            style={{ color: '#EDB74D', textDecoration: 'underline' }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;