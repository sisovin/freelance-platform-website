import React, { useState, useEffect } from 'react';

const RealtimeChat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch chat messages from the server
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/chat/messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newMessage })
      });
      const data = await response.json();
      setMessages([...messages, data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h2>Realtime Chat</h2>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="new-message-input">New Message:</label>
          <input
            id="new-message-input"
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            required
            placeholder="Type your message here"
            title="New message content"
            aria-label="New message input"
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default RealtimeChat;
