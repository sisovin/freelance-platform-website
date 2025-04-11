import React, { useState, useEffect } from 'react';

const UserDashboard = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    bio: '',
    profilePicture: '',
    posts: [],
    friends: [],
    groups: [],
    media: []
  });

  useEffect(() => {
    // Fetch user dashboard data from the server
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/dashboard');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      <div>
        <h3>Profile</h3>
        <p>Username: {userData.username}</p>
        <p>Email: {userData.email}</p>
        <p>Bio: {userData.bio}</p>
        <img src={userData.profilePicture} alt="Profile" />
      </div>
      <div>
        <h3>Posts</h3>
        {userData.posts.map((post) => (
          <div key={post.id}>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
      <div>
        <h3>Friends</h3>
        {userData.friends.map((friend) => (
          <div key={friend.id}>
            <p>{friend.name}</p>
          </div>
        ))}
      </div>
      <div>
        <h3>Groups</h3>
        {userData.groups.map((group) => (
          <div key={group.id}>
            <p>{group.name}</p>
          </div>
        ))}
      </div>
      <div>
        <h3>Media</h3>
        {userData.media.map((mediaItem) => (
          <div key={mediaItem.id}>
            <img src={mediaItem.url} alt="Media" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
