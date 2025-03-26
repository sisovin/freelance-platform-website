import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch users, jobs, and posts from the server
    const fetchData = async () => {
      try {
        const [usersResponse, jobsResponse, postsResponse] = await Promise.all([
          fetch('/api/admin/users'),
          fetch('/api/admin/jobs'),
          fetch('/api/admin/posts')
        ]);
        const usersData = await usersResponse.json();
        const jobsData = await jobsResponse.json();
        const postsData = await postsResponse.json();
        setUsers(usersData);
        setJobs(jobsData);
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      });
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await fetch(`/api/admin/jobs/${jobId}`, {
        method: 'DELETE'
      });
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await fetch(`/api/admin/posts/${postId}`, {
        method: 'DELETE'
      });
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <h3>Users</h3>
        {users.map(user => (
          <div key={user.id}>
            <p>{user.username}</p>
            <button onClick={() => handleDeleteUser(user.id)}>Delete User</button>
          </div>
        ))}
      </div>
      <div>
        <h3>Jobs</h3>
        {jobs.map(job => (
          <div key={job.id}>
            <p>{job.title}</p>
            <button onClick={() => handleDeleteJob(job.id)}>Delete Job</button>
          </div>
        ))}
      </div>
      <div>
        <h3>Posts</h3>
        {posts.map(post => (
          <div key={post.id}>
            <p>{post.content}</p>
            <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
