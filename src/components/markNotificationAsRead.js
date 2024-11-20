// In your api.js or a similar file
export const markNotificationAsRead = async (notificationId) => {
    const response = await fetch(`/api/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to mark notification as read');
    }
  
    return response.json();
  };
  