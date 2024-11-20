// import React, { useEffect, useState } from 'react';
// import { fetchNotifications } from '../api';
// import NotificationCenter from '../components/NotificationCenter';
// import { useNavigate } from 'react-router-dom';
// import styles from '../style/StudentPage.module.css';

// const StudentPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [error, setError] = useState('');
//   const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const studentId = sessionStorage.getItem('student_srn');
//     if (!studentId) {
//       console.error('Student SRN not found in sessionStorage.');
//       sessionStorage.clear();
//       navigate('/login');
//       return;
//     }

//     const loadNotifications = async () => {
//       try {
//         setIsLoadingNotifications(true);
//         const data = await fetchNotifications(studentId); // Pass studentId here
//         setNotifications(data);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//         setError('Failed to load notifications.');
//       } finally {
//         setIsLoadingNotifications(false);
//       }
//     };

//     loadNotifications();
//   }, [navigate]);

//   const handleConnectionsClick = () => {
//     navigate('/connectionsPage');
//   };

//   const handleFeedback = () => {
//     navigate('/feedbackform');
//   };

//   return (
//     <div className={styles.studentPageContainer}>
//       <header className={styles.nav}>
//         <h2>CONNECT X</h2>
//         <div className={styles.menu}>
//           <p>About us</p>
//           <p>Our Mission</p>
//           <p>Contact us</p>
//         </div>
//       </header>

//       <main className={styles.content}>
//         <div className={styles.leftSection}>
//           {isLoadingNotifications ? (
//             <p>Loading notifications...</p>
//           ) : (
//             <NotificationCenter notifications={notifications} />
//           )}
//         </div>

//         <div className={styles.centerSection}>
//           <button className={styles.connectionsBtn} onClick={handleConnectionsClick}>
//             View Alumni Connections
//           </button>
//         </div>

//         <div className={styles.chatSection}>
//           <p>Loading chat...</p>
//         </div>
//         <div>
//           <button onClick={handleFeedback}>Enter Feedback</button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default StudentPage;


// import React, { useEffect, useState } from 'react';
// import { fetchNotifications, UserFeedback } from '../api';
// import NotificationCenter from '../components/NotificationCenter';
// import { useNavigate } from 'react-router-dom';
// import styles from '../style/StudentPage.module.css';

// const StudentPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [error, setError] = useState('');
//   const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);
//   const [content, setContent] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [showFeedbackForm, setShowFeedbackForm] = useState(false); // New state to show/hide the feedback form
//   const navigate = useNavigate();

//   useEffect(() => {
//     const studentId = sessionStorage.getItem('student_srn');
//     if (!studentId) {
//       console.error('Student SRN not found in sessionStorage.');
//       sessionStorage.clear();
//       navigate('/login');
//       return;
//     }

//     const loadNotifications = async () => {
//       try {
//         setIsLoadingNotifications(true);
//         const data = await fetchNotifications(studentId); // Pass studentId here
//         setNotifications(data);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//         setError('Failed to load notifications.');
//       } finally {
//         setIsLoadingNotifications(false);
//       }
//     };

//     loadNotifications();
//   }, [navigate]);

//   const handleConnectionsClick = () => {
//     navigate('/connectionsPage');
//   };

//   const handleSubmitFeedback = async (e) => {
//     e.preventDefault();

//     const stud_srn = sessionStorage.getItem('student_srn');
//     if (!stud_srn) {
//       setError('Student SRN not found. Please log in.');
//       sessionStorage.clear();
//       navigate('/login');
//       return;
//     }

//     try {
//       const response = await UserFeedback({ content, stud_srn });
//       setSuccessMessage('Feedback submitted successfully!');
//       setContent(''); // Reset feedback field
//       setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//       setError('Failed to submit feedback. Please try again.');
//       setTimeout(() => setError(''), 3000); // Clear error message after 3 seconds
//     }
//   };

//   const handleFeedbackClick = () => {
//     setShowFeedbackForm(!showFeedbackForm); // Toggle the visibility of the feedback form
//   };

//   return (
//     <div className={styles.studentPageContainer}>
//       <header className={styles.nav}>
//         <h2>CONNECT X</h2>
//         <div className={styles.menu}>
//           <p>About us</p>
//           <p>Our Mission</p>
//           <p>Contact us</p>
//         </div>
//       </header>

//       <main className={styles.content}>
//         <div className={styles.leftSection}>
//           {isLoadingNotifications ? (
//             <p>Loading notifications...</p>
//           ) : (
//             <NotificationCenter notifications={notifications} />
//           )}
//         </div>

//         <div className={styles.centerSection}>
//           <button className={styles.connectionsBtn} onClick={handleConnectionsClick}>
//             View Alumni Connections
//           </button>
//         </div>

//         <div className={styles.chatSection}>
//           <p>Loading chat...</p>
//         </div>

//         {/* Feedback Button */}
//         <div>
//         <button onClick={handleFeedbackClick} className={styles.feedbackButton}>
//   {showFeedbackForm ? 'Cancel Feedback' : 'Enter Feedback'}
// </button>

//         </div>

//         {/* Conditionally render the Feedback Form */}
//         {showFeedbackForm && (
//           <div className={styles.feedbackFormContainer}>
//             <h2>Submit Feedback</h2>
//             <form onSubmit={handleSubmitFeedback} className={styles.form}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="content">Feedback:</label>
//                 <textarea
//                   id="content"
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   placeholder="Enter your feedback here..."
//                   maxLength="1000"
//                   required
//                   className={styles.textarea}
//                 />
//               </div>
//               {error && <p className={styles.error}>{error}</p>}
//               {successMessage && <p className={styles.success}>{successMessage}</p>}
//               <button type="submit" className={styles.submitButton}>
//                 Submit Feedback
//               </button>
//             </form>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default StudentPage;


import React, { useEffect, useState } from 'react';
import { fetchNotifications, UserFeedback } from '../api';
import NotificationCenter from '../components/NotificationCenter';
import { useNavigate } from 'react-router-dom';
import styles from '../style/StudentPage.module.css';

const StudentPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false); // New state to show/hide the feedback form
  const navigate = useNavigate();

  useEffect(() => {
    const studentId = sessionStorage.getItem('student_srn');
    if (!studentId) {
      console.error('Student SRN not found in sessionStorage.');
      sessionStorage.clear();
      navigate('/login');
      return;
    }

    const loadNotifications = async () => {
      try {
        setIsLoadingNotifications(true);
        const data = await fetchNotifications(studentId); // Pass studentId here
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to load notifications.');
      } finally {
        setIsLoadingNotifications(false);
      }
    };

    loadNotifications();
  }, [navigate]);

  const handleConnectionsClick = () => {
    navigate('/connectionsPage');
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();

    const stud_srn = sessionStorage.getItem('student_srn');
    if (!stud_srn) {
      setError('Student SRN not found. Please log in.');
      sessionStorage.clear();
      navigate('/login');
      return;
    }

    try {
      const response = await UserFeedback({ content, stud_srn });
      setSuccessMessage('Feedback submitted successfully!');
      setContent(''); // Reset feedback field
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback. Please try again.');
      setTimeout(() => setError(''), 3000); // Clear error message after 3 seconds
    }
  };

  const handleFeedbackClick = () => {
    setShowFeedbackForm(!showFeedbackForm); // Toggle the visibility of the feedback form
  };

  // New function for navigating to About Us page
  const handleAboutClick = () => {
    navigate('/aboutUs'); // Navigate to the About Us page
  };

  const handleMission = () =>{
    navigate('OurMission')
  };

  return (
    <div className={styles.studentPageContainer}>
      <header className={styles.nav}>
        <h2>CONNECT X</h2>
        <div className={styles.menu}>
          {/* Updated About Us link */}
          <p onClick={handleAboutClick} className={styles.menuItem}>About us</p>
          <p onClick={handleMission} className={styles.menuItem}>Our Mission</p>
          <p>Contact us</p>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.leftSection}>
          {isLoadingNotifications ? (
            <p>Loading notifications...</p>
          ) : (
            <NotificationCenter notifications={notifications} />
          )}
        </div>

        <div className={styles.centerSection}>
          <button className={styles.connectionsBtn} onClick={handleConnectionsClick}>
            View Alumni Connections
          </button>
        </div>

        <div className={styles.chatSection}>
          <p>Loading chat...</p>
        </div>

        {/* Feedback Button */}
        <div>
          <button onClick={handleFeedbackClick} className={styles.feedbackButton}>
            {showFeedbackForm ? 'Cancel Feedback' : 'Enter Feedback'}
          </button>
        </div>

        {/* Conditionally render the Feedback Form */}
        {showFeedbackForm && (
          <div className={styles.feedbackFormContainer}>
            <h2>Submit Feedback</h2>
            <form onSubmit={handleSubmitFeedback} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="content">Feedback:</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter your feedback here..."
                  maxLength="1000"
                  required
                  className={styles.textarea}
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              {successMessage && <p className={styles.success}>{successMessage}</p>}
              <button type="submit" className={styles.submitButton}>
                Submit Feedback
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentPage;
