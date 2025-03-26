import React, { useState } from 'react';

const PageBuilder = () => {
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState('');

  const handleInputChange = (e) => {
    setNewSection(e.target.value);
  };

  const handleAddSection = () => {
    setSections([...sections, newSection]);
    setNewSection('');
  };

  const handleRemoveSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const fetchPageData = async () => {
    try {
      const response = await fetch('/api/pageRoutes/pages');
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error('Error fetching page data:', error);
    }
  };

  const savePageData = async () => {
    try {
      await fetch('/api/pageRoutes/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sections)
      });
    } catch (error) {
      console.error('Error saving page data:', error);
    }
  };

  return (
    <div>
      <h2>Page Builder</h2>
      <div>
        <input
          type="text"
          value={newSection}
          onChange={handleInputChange}
          placeholder="Enter section content"
        />
        <button onClick={handleAddSection}>Add Section</button>
      </div>
      <div>
        {sections.map((section, index) => (
          <div key={index}>
            <p>{section}</p>
            <button onClick={() => handleRemoveSection(index)}>Remove Section</button>
          </div>
        ))}
      </div>
      <button onClick={fetchPageData}>Fetch Page Data</button>
      <button onClick={savePageData}>Save Page Data</button>
    </div>
  );
};

export default PageBuilder;
