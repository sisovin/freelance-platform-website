const { body, param } = require('express-validator');

const jobValidator = {
  createJob: [
    body('title')
      .notEmpty().withMessage('Title is required')
      .isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),
    body('description')
      .notEmpty().withMessage('Description is required')
      .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('location')
      .notEmpty().withMessage('Location is required')
      .isLength({ max: 100 }).withMessage('Location must be less than 100 characters'),
    body('salary')
      .notEmpty().withMessage('Salary is required')
      .isNumeric().withMessage('Salary must be a number'),
    body('deadline')
      .notEmpty().withMessage('Deadline is required')
      .isISO8601().withMessage('Deadline must be a valid date')
  ],
  updateJob: [
    param('jobId')
      .notEmpty().withMessage('Job ID is required')
      .isMongoId().withMessage('Job ID must be a valid Mongo ID'),
    body('title')
      .optional()
      .isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),
    body('description')
      .optional()
      .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('location')
      .optional()
      .isLength({ max: 100 }).withMessage('Location must be less than 100 characters'),
    body('salary')
      .optional()
      .isNumeric().withMessage('Salary must be a number'),
    body('deadline')
      .optional()
      .isISO8601().withMessage('Deadline must be a valid date')
  ],
  deleteJob: [
    param('jobId')
      .notEmpty().withMessage('Job ID is required')
      .isMongoId().withMessage('Job ID must be a valid Mongo ID')
  ],
  getJobById: [
    param('jobId')
      .notEmpty().withMessage('Job ID is required')
      .isMongoId().withMessage('Job ID must be a valid Mongo ID')
  ]
};

module.exports = jobValidator;
