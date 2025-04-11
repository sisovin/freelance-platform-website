const { body, param } = require('express-validator');

const validateMediaUpload = [
  body('file')
    .exists()
    .withMessage('File is required')
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('File is required');
      }
      return true;
    })
];

const validateMediaUpdate = [
  param('id')
    .isMongoId()
    .withMessage('Invalid media ID'),
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
];

const validateMediaDelete = [
  param('id')
    .isMongoId()
    .withMessage('Invalid media ID')
];

module.exports = {
  validateMediaUpload,
  validateMediaUpdate,
  validateMediaDelete
};
