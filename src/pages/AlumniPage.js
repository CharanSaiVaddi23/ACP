import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEvents, postEvent } from '../api'; // Import fetchEvents and postEvent functions
import EventCenter from '../components/EventCenter';
import '../style/AlumniPage.css';

const AlumniPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch events when the component mounts
  useEffect(() => {
    const getEvents = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await fetchEvents(); // Fetch events from your API
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        setErrorMessage("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
    
    getEvents();
  }, []);

  // Handle form submission for posting a new event
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
        const newEvent = { title, event_desc: eventDesc, contact_info: contactInfo };
        await postEvent(newEvent);

        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
        
        setTitle('');
        setEventDesc('');
        setContactInfo('');
    } catch (error) {
        if (error.response) {
            const errorMsg = error.response.data?.message || "Failed to post event. Please try again.";
            setErrorMessage(errorMsg);
        } else if (error.request) {
            setErrorMessage("No response received from the server.");
        } else {
            setErrorMessage("Unexpected error occurred: " + error.message);
        }
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="alumniPageContainer">
      <header className="nav">
        <h2 className="logo">CONNECT X</h2>
        <div className="menu">
          <p>About us</p>
          <p>Our Mission</p>
          <p>Contact us</p>
        </div>
      </header>

      <main className="content">
        <div className="leftSection">
          <h3>Post Event</h3>
          <form className="eventForm" onSubmit={handleEventSubmit}>
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Event Description"
              value={eventDesc}
              onChange={(e) => setEventDesc(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Contact Info"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>Post Event</button>
          </form>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>

        <div className="rightSection">
          {/* Displaying events */}
          <EventCenter events={events} />
        </div>

        <div className="chatSection">
          <h3>Chat Section</h3>
          <input type="text" placeholder="Type a message..." />
          <button>Send</button>
        </div>
      </main>
    </div>
  );
};

export default AlumniPage;