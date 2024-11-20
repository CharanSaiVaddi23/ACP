import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../api'; // Assuming fetchEvents is correctly defined
import '../style/EventCenter.css';

const EventCenter = ({ events }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  return (
    <div className="event-center">
      <h3>Upcoming Events</h3>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="event-list">
          {events.map((event) => (
            <li key={event.event_id} className="event-item">
              <h4>Title: {event.title}</h4>
              <h4>Desc: {event.Event_desc}</h4>
              <h4>Contact: {event.contact_info}</h4>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventCenter;
