const Job = require('../models/Job');
const User = require('../models/User');

// Create a new job posting
const createJob = async (req, res) => {
  try {
    const { title, description, location, salary, deadline } = req.body;
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      deadline,
      createdBy: req.user.id
    });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error });
  }
};

// Update an existing job posting
const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { title, description, location, salary, deadline } = req.body;
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { title, description, location, salary, deadline },
      { new: true }
    );
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error });
  }
};

// Delete a job posting
const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error });
  }
};

// Get all job postings
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};

// Get a specific job posting by ID
const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job', error });
  }
};

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getJobById
};
