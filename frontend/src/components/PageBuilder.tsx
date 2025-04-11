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
    </div>
  );
};

export default PageBuilder;
