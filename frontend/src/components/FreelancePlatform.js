import React, { useState, useEffect } from 'react';

const FreelancePlatform = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: ''
  });

  useEffect(() => {
    // Fetch freelance projects from the server
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProject)
      });
      const data = await response.json();
      setProjects([...projects, data]);
      setNewProject({
        title: '',
        description: '',
        budget: '',
        deadline: ''
      });
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div>
      <h2>Freelance Platform</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={newProject.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Budget:</label>
          <input
            type="text"
            name="budget"
            value={newProject.budget}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={newProject.deadline}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Create Project</button>
      </form>
      <div>
        {projects.map((project) => (
          <div key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Budget: {project.budget}</p>
            <p>Deadline: {project.deadline}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreelancePlatform;
