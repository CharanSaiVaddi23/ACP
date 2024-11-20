import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Function to register a student
export const registerStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { userType: 'student', ...studentData });
    return response.data;
  } catch (error) {
    console.error("Error registering student:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "An error occurred while registering the student.");
  }
};

// Function to register an alumni
export const registerAlumni = async (alumniData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { userType: 'alumni', ...alumniData });
    return response.data;
  } catch (error) {
    console.error("Error registering alumni:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "An error occurred while registering the alumni.");
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error.response?.data || error.message);
    throw error;
  }
};

// Function to send a message
export const sendMessage = async (content) => {
    if (!content) {
        console.error("Message content is undefined or empty");
        throw new Error("Message content is required");
    }

    try {
        await axios.post(`${API_URL}/chat`, { content });
    } catch (error) {
        console.error("Error sending message:", error.response?.data || error.message);
        throw error;
    }
};

// Function to fetch messages
export const fetchMessages = async () => {
    try {
        const response = await axios.get(`${API_URL}/chat/messages`);
        return response.data;
    } catch (error) {
        console.error("Error fetching messages:", error.response?.data || error.message);
        throw error;
    }
};

export const fetchNotifications = async (recipient_id) => {
    try {
        const response = await axios.get(`${API_URL}/api/notifications`, {
            params: { recipient_id }  // Sending recipient_id as query param
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error.response?.data || error.message);
        throw error;
    }
};


// Function to fetch student profile
export const fetchStudentProfile = async (srn) => {
    if (!srn) {
        console.error("SRN is undefined");
        throw new Error("SRN is required");
    }

    try {
        const response = await axios.get(`${API_URL}/api/student/profile/${srn}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching student profile:", error.response?.data || error.message);
        throw error;
    }
};

// Function to fetch alumni profiles
export const fetchAlumniProfiles = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/alumni`);
        return response.data;
    } catch (error) {
        console.error("Error fetching alumni profiles:", error.response?.data || error.message);
        throw error;
    }
};

// Function to save profile details
export const saveProfileDetails = async (profileData) => {
    const { srn } = profileData || {};
    if (!srn) {
        console.error("Profile data or SRN is undefined");
        throw new Error("Profile data and SRN are required");
    }

    try {
        const response = await axios.put(`${API_URL}/api/student/profile/${srn}`, profileData);
        return response.data;
    } catch (error) {
        console.error("Error saving profile details:", error.response?.data || error.message);
        throw error;
    }
};

export const markNotificationAsRead = async (notificationId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  };

// Function to put feedback
export const UserFeedback = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/feedback`, userData);
        return response.data;
    } catch (error) {
        console.error("Error uploading feedback:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch events from the backend
export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data; // Return the fetched events
  } catch (error) {
    console.error('Error fetching events:', error.response?.data || error.message);
    throw error; // Throw error if fetching fails
  }
};


export const postEvent = async (eventData) => {
    try {
        const response = await axios.post(`${API_URL}/api/events`, eventData);
        return response.data; // Return success message or data from the response
    } catch (error) {
        console.error('Error posting event:', error.response?.data || error.message);
        throw error; // Throw error if posting fails
    }
};
