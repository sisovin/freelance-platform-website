import React, { useState, useEffect } from 'react';

interface Job {
  id: string | number;
  title: string;
  description: string;
  location: string;
  salary: string;
}

const JobPortal = () => {
  const [jobListings, setJobListings] = useState<Job[]>([]);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewJob({
      ...newJob,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
          <label htmlFor="job-title">Title:</label>
          <input
            id="job-title"
            type="text"
            name="title"
            value={newJob.title}
            onChange={handleInputChange}
            placeholder="Enter job title"
            aria-label="Job title"
            required
          />
        </div>
        <div>
          <label htmlFor="job-description">Description:</label>
          <textarea
            id="job-description"
            name="description"
            value={newJob.description}
            onChange={handleInputChange}
            placeholder="Enter job description"
            aria-label="Job description"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="job-location">Location:</label>
          <input
            id="job-location"
            type="text"
            name="location"
            value={newJob.location}
            onChange={handleInputChange}
            placeholder="Enter job location"
            aria-label="Job location"
            required
          />
        </div>
        <div>
          <label htmlFor="job-salary">Salary:</label>
          <input
            id="job-salary"
            type="text"
            name="salary"
            value={newJob.salary}
            onChange={handleInputChange}
            placeholder="Enter job salary"
            aria-label="Job salary"
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
