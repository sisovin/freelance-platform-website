const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

// Route to create a new job posting
router.post('/', authMiddleware, roleMiddleware(['employer']), jobController.createJob);

// Route to update an existing job posting
router.put('/:jobId', authMiddleware, roleMiddleware(['employer']), jobController.updateJob);

// Route to delete a job posting
router.delete('/:jobId', authMiddleware, roleMiddleware(['employer']), jobController.deleteJob);

// Route to get all job postings
router.get('/', jobController.getAllJobs);

// Route to get a specific job posting by ID
router.get('/:jobId', jobController.getJobById);

module.exports = router;
