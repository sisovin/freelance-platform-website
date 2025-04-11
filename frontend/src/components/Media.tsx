import React, { useState, useEffect } from 'react';

const Media = () => {
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [newMedia, setNewMedia] = useState<File | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewMedia(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    
    if (newMedia) {
      formData.append('file', newMedia);
    }

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
            id="media-upload"
            type="file"
            onChange={handleFileChange}
            aria-label="Upload media file"
            title="Select a file to upload"
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
