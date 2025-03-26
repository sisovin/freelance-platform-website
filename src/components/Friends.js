import React, { useState, useEffect } from 'react';

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState('');

  useEffect(() => {
    // Fetch friends from the server
    const fetchFriends = async () => {
      try {
        const response = await fetch('/api/friends');
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  const handleInputChange = (e) => {
    setNewFriend(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/friends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newFriend })
      });
      const data = await response.json();
      setFriends([...friends, data]);
      setNewFriend('');
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  return (
    <div>
      <h2>Friends</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Friend:</label>
          <input
            type="text"
            value={newFriend}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Friend</button>
      </form>
      <div>
        {friends.map((friend) => (
          <div key={friend.id}>
            <p>{friend.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
