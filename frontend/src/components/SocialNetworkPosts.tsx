import React, { useState, useEffect } from 'react';

interface Post {
  id: string | number;
  content: string;
}

const SocialNetworkPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
          <label htmlFor="new-post-textarea">New Post:</label>
          <textarea
            id="new-post-textarea"
            value={newPost}
            onChange={handleInputChange}
            required
            placeholder="What's on your mind?"
            title="New post content"
            aria-label="New post textarea"
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
