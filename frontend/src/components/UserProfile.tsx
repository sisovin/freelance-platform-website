import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    bio: '',
    profilePicture: ''
  });

  useEffect(() => {
    // Fetch user profile data from the server
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      console.log('Profile updated:', data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            required
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
            placeholder="Enter your email address"
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={userData.bio}
            onChange={handleInputChange}
            placeholder="Tell us about yourself"
          />
        </div>
        <div>
          <label htmlFor="profilePicture">Profile Picture URL:</label>
          <input
            type="text"
            id="profilePicture"
            name="profilePicture"
            value={userData.profilePicture}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
