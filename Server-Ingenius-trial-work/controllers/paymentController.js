const { Payment } = require('../models');

exports.createPayment = async (req, res) => {
  try {
    const { subscriptionId, amount } = req.body;
    const payment = await Payment.create({
      subscriptionId,
      amount,
      paymentDate: new Date(),
      status: 'completed',
    });
    res.status(201).json({
      message: 'Payment created successfully.',
      payment: payment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create payment.' });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payments.' });
  }
};

exports.getPlans = async (req, res) => {
  const plans = await Plan.findAll();
  res.status(200).json(plans);
};
