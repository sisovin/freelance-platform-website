import React, { useState, useEffect } from 'react';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState('');

  useEffect(() => {
    // Fetch groups from the server
    const fetchGroups = async () => {
      try {
        const response = await fetch('/api/groups');
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleInputChange = (e) => {
    setNewGroup(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newGroup })
      });
      const data = await response.json();
      setGroups([...groups, data]);
      setNewGroup('');
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div>
      <h2>Groups</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Group:</label>
          <input
            type="text"
            value={newGroup}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Create Group</button>
      </form>
      <div>
        {groups.map((group) => (
          <div key={group.id}>
            <p>{group.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
