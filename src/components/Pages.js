import React, { useState, useEffect } from 'react';

const Pages = () => {
  const [pages, setPages] = useState([]);
  const [newPage, setNewPage] = useState('');

  useEffect(() => {
    // Fetch pages from the server
    const fetchPages = async () => {
      try {
        const response = await fetch('/api/pages');
        const data = await response.json();
        setPages(data);
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };

    fetchPages();
  }, []);

  const handleInputChange = (e) => {
    setNewPage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newPage })
      });
      const data = await response.json();
      setPages([...pages, data]);
      setNewPage('');
    } catch (error) {
      console.error('Error creating page:', error);
    }
  };

  return (
    <div>
      <h2>Pages</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Page:</label>
          <textarea
            value={newPage}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Create Page</button>
      </form>
      <div>
        {pages.map((page) => (
          <div key={page.id}>
            <p>{page.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pages;
