const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route for processing payments
router.post('/process', paymentController.processPayment);

// Route for handling transactions
router.get('/transactions', paymentController.getTransactions);

module.exports = router;
