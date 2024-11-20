// src/components/Chat.js
import React, { useState } from 'react';
import { sendMessage, fetchMessages } from '../api';
import '../style/Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    await sendMessage(message);
    const newMessages = await fetchMessages();
    setMessages(newMessages);
    setMessage('');
  };

  return (
    <div className="chat-section">
      <h3>One-on-One Chat</h3>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index} className="chat-message">{msg.content}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
