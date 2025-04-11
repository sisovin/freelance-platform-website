import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface Blog {
  id: string;
  title: string;
  content: string;
}

interface NewBlog {
  title: string;
  content: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [newBlog, setNewBlog] = useState<NewBlog>({
    title: '',
    content: ''
  });

  useEffect(() => {
    // Fetch blog posts from the server
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    
    fetchBlogs();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBlog({
      ...newBlog,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBlog)
      });
      const data = await response.json();
      setBlogs([...blogs, data]);
      setNewBlog({
        title: '',
        content: ''
      });
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title-input">Title:</label>
          <input
            id="title-input"
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleInputChange}
            placeholder="Enter blog title"
            aria-label="Blog title"
            required
          />
        </div>
        <div>
          <label htmlFor="content-input">Content:</label>
          <textarea
            id="content-input"
            name="content"
            value={newBlog.content}
            onChange={handleInputChange}
            placeholder="Enter blog content"
            aria-label="Blog content"
            required
          />
        </div>
        <button type="submit">Create Blog</button>
      </form>
      <div>
        {blogs.map((blog) => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
