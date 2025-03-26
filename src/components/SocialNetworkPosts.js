import React, { useState, useEffect } from 'react';

const SocialNetworkPosts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    // Fetch posts from the server
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newPost })
      });
      const data = await response.json();
      setPosts([...posts, data]);
      setNewPost('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h2>Social Network Posts</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Post:</label>
          <textarea
            value={newPost}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Post</button>
      </form>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialNetworkPosts;
