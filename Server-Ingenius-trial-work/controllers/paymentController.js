const { Payment, Subscription } = require('../models');

exports.createPayment = async (req, res) => {
  const { subscriptionId, amount } = req.body;
  const payment = await Payment.create({
    subscriptionId,
    amount,
    paymentDate: new Date(),
    status: 'completed',
  });
  res.status(201).json(payment);
};

exports.getPayments = async (req, res) => {
  const payments = await Payment.findAll({
    include: [{ model: Subscription, where: { userId: req.session.user.id } }],
  });
  res.status(200).json(payments);
};
