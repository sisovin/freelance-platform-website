const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Transaction = require('../models/Transaction');

const processPayment = async (amount, paymentMethod) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethod,
      confirm: true,
    });

    const transaction = new Transaction({
      amount,
      paymentMethod,
      status: paymentIntent.status,
      transactionId: paymentIntent.id,
    });

    await transaction.save();

    return {
      success: true,
      message: 'Payment processed successfully',
      transaction,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Payment processing failed',
      error,
    };
  }
};

const getTransactions = async () => {
  try {
    const transactions = await Transaction.find();
    return transactions;
  } catch (error) {
    throw new Error('Failed to retrieve transactions');
  }
};

module.exports = {
  processPayment,
  getTransactions,
};
