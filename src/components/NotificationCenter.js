// src/components/NotificationCenter.js
import React, { useEffect, useState } from 'react';
import { fetchNotifications } from '../api';
import '../style/NotificationCenter.css';


const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const studentId = sessionStorage.getItem('student_srn');
        if (!studentId) {
          throw new Error('Student SRN not found');
        }
        setIsLoadingNotifications(true);
        const data = await fetchNotifications(studentId); // Pass studentId to fetch notifications
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to load notifications. Please try again later.');
      } finally {
        setIsLoadingNotifications(false);
      }
    };
    loadNotifications();    
  }, []);

  return (
    <div className="notification-center">
      <h3>Notifications</h3>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.Notification_id} className={notification.read_status ? 'read' : 'unread'}>
            <p>{notification.Content}</p>
            <span>{new Date(notification.Timestamp).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationCenter;