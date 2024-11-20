import React, { useState } from 'react';
import { UserFeedback } from '../api';
import { useNavigate } from 'react-router-dom';
import styles from '../style/FeedbackForm.module.css';

const FeedbackForm = () => {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
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

    return (
        <div className={styles.feedbackFormContainer}>
            <h2>Submit Feedback</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
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
    );
};

export default FeedbackForm;
