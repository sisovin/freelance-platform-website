const paymentService = require('../services/paymentService');

const processPayment = async (req, res) => {
  try {
    const { amount, paymentMethod } = req.body;
    const paymentResult = await paymentService.processPayment(amount, paymentMethod);
    res.status(200).json(paymentResult);
  } catch (error) {
    res.status(500).json({ message: 'Payment processing failed', error });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await paymentService.getTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve transactions', error });
  }
};

module.exports = {
  processPayment,
  getTransactions,
};
