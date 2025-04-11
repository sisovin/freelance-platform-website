import React, { useState, useEffect } from 'react';

interface Group {
  id: string | number;
  name: string;
}

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGroup(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
          <label htmlFor="group-input">New Group:</label>
          <input
            id="group-input"
            type="text"
            value={newGroup}
            onChange={handleInputChange}
            placeholder="Enter group name"
            aria-label="New group name"
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
