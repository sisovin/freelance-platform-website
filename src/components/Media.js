import React, { useState, useEffect } from 'react';

const Media = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [newMedia, setNewMedia] = useState(null);

  useEffect(() => {
    // Fetch media files from the server
    const fetchMediaFiles = async () => {
      try {
        const response = await fetch('/api/media');
        const data = await response.json();
        setMediaFiles(data);
      } catch (error) {
        console.error('Error fetching media files:', error);
      }
    };

    fetchMediaFiles();
  }, []);

  const handleFileChange = (e) => {
    setNewMedia(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', newMedia);

    try {
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setMediaFiles([...mediaFiles, data]);
      setNewMedia(null);
    } catch (error) {
      console.error('Error uploading media file:', error);
    }
  };

  return (
    <div>
      <h2>Media</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Media:</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      <div>
        {mediaFiles.map((file) => (
          <div key={file.id}>
            <p>{file.name}</p>
            <img src={file.url} alt={file.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Media;
