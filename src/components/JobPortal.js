import React, { useState, useEffect } from 'react';

const JobPortal = () => {
  const [jobListings, setJobListings] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    location: '',
    salary: ''
  });

  useEffect(() => {
    // Fetch job listings from the server
    const fetchJobListings = async () => {
      try {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        setJobListings(data);
      } catch (error) {
        console.error('Error fetching job listings:', error);
      }
    };

    fetchJobListings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({
      ...newJob,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJob)
      });
      const data = await response.json();
      setJobListings([...jobListings, data]);
      setNewJob({
        title: '',
        description: '',
        location: '',
        salary: ''
      });
    } catch (error) {
      console.error('Error creating job listing:', error);
    }
  };

  return (
    <div>
      <h2>Job Portal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={newJob.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={newJob.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={newJob.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="text"
            name="salary"
            value={newJob.salary}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Create Job Listing</button>
      </form>
      <div>
        {jobListings.map((job) => (
          <div key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>{job.location}</p>
            <p>{job.salary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPortal;
