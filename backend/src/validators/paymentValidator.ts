const { check, validationResult } = require('express-validator');

const validatePayment = [
  check('amount')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be a positive number'),
  check('paymentMethod')
    .not()
    .isEmpty()
    .withMessage('Payment method is required'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validatePayment,
  handleValidationErrors,
};
