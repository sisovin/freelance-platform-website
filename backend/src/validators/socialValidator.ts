const { body, param } = require('express-validator');

const validatePost = [
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .isString()
    .withMessage('Content must be a string')
    .isLength({ max: 500 })
    .withMessage('Content must be less than 500 characters')
];

const validateComment = [
  body('comment')
    .notEmpty()
    .withMessage('Comment is required')
    .isString()
    .withMessage('Comment must be a string')
    .isLength({ max: 300 })
    .withMessage('Comment must be less than 300 characters')
];

const validatePostId = [
  param('id')
    .notEmpty()
    .withMessage('Post ID is required')
    .isMongoId()
    .withMessage('Invalid Post ID')
];

module.exports = {
  validatePost,
  validateComment,
  validatePostId
};
