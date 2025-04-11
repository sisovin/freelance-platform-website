const { check, validationResult } = require('express-validator');

const validateSignup = [
  check('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const validateLogin = [
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  check('password')
    .notEmpty()
    .withMessage('Password is required'),
];

const validate2FA = [
  check('otp')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits long'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateSignup,
  validateLogin,
  validate2FA,
  handleValidationErrors,
};
