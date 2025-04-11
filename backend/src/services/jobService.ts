const Job = require('../models/Job');
const User = require('../models/User');

// Create a new job posting
const createJob = async (jobData) => {
  try {
    const { title, description, location, salary, deadline, createdBy } = jobData;
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      deadline,
      createdBy
    });
    const savedJob = await newJob.save();
    return savedJob;
  } catch (error) {
    throw new Error('Error creating job');
  }
};

// Update an existing job posting
const updateJob = async (jobId, jobData) => {
  try {
    const { title, description, location, salary, deadline } = jobData;
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { title, description, location, salary, deadline },
      { new: true }
    );
    if (!updatedJob) {
      throw new Error('Job not found');
    }
    return updatedJob;
  } catch (error) {
    throw new Error('Error updating job');
  }
};

// Delete a job posting
const deleteJob = async (jobId) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (!deletedJob) {
      throw new Error('Job not found');
    }
    return { message: 'Job deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting job');
  }
};

// Get all job postings
const getAllJobs = async () => {
  try {
    const jobs = await Job.find();
    return jobs;
  } catch (error) {
    throw new Error('Error fetching jobs');
  }
};

// Get a specific job posting by ID
const getJobById = async (jobId) => {
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      throw new Error('Job not found');
    }
    return job;
  } catch (error) {
    throw new Error('Error fetching job');
  }
};

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getJobById
};
