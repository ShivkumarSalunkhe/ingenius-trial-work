const { Plan, Subscription, Payment } = require('../models');

exports.getPlans = async (req, res) => {
  const plans = await Plan.findAll();
  res.status(200).json(plans);
};

exports.createSubscription = async (req, res) => {
  const { planId } = req.body;
  const subscription = await Subscription.create({
    userId: req.session.user.id,
    planId,
    startDate: new Date(),
    endDate: null,
    status: 'active',
  });
  res.status(201).json(subscription);
};

exports.getSubscription = async (req, res) => {
  const subscription = await Subscription.findOne({
    where: { userId: req.session.user.id, status: 'active' },
    include: [Plan],
  });
  res.status(200).json(subscription);
};

exports.updateSubscription = async (req, res) => {
  const { planId } = req.body;
  const subscription = await Subscription.findOne({
    where: { userId: req.session.user.id, status: 'active' },
  });
  subscription.planId = planId;
  await subscription.save();
  res.status(200).json(subscription);
};

exports.cancelSubscription = async (req, res) => {
  const subscription = await Subscription.findOne({
    where: { userId: req.session.user.id, status: 'active' },
  });
  subscription.status = 'canceled';
  subscription.endDate = new Date();
  await subscription.save();
  res.status(200).json(subscription);
};
