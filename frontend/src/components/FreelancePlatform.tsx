import React, { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
}

const FreelancePlatform = () => {
  const [projects, setProjects] = useState<Project[]>([]);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
          <label htmlFor="title-input">Title:</label>
          <input
            id="title-input"
            type="text"
            name="title"
            value={newProject.title}
            onChange={handleInputChange}
            placeholder="Enter project title"
            aria-label="Project title"
            required
          />
        </div>
        <div>
          <label htmlFor="description-input">Description:</label>
          <textarea
            id="description-input"
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            placeholder="Enter project description"
            aria-label="Project description"
            required
          />
        </div>
        <div>
          <label htmlFor="budget-input">Budget:</label>
          <input
            id="budget-input"
            type="text"
            name="budget"
            value={newProject.budget}
            onChange={handleInputChange}
            placeholder="Enter project budget"
            aria-label="Project budget"
            required
          />
        </div>
        <div>
          <label htmlFor="deadline-input">Deadline:</label>
          <input
            id="deadline-input"
            type="date"
            name="deadline"
            value={newProject.deadline}
            onChange={handleInputChange}
            aria-label="Project deadline"
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
