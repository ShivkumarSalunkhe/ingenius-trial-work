const { Plan, Subscription, Payment } = require("../models");

exports.getPlans = async (req, res) => {
  const plans = await Plan.findAll();
  res.status(200).json(plans);
};

exports.createSubscription = async (req, res) => {
  const { planId } = req.body;
  try {
    const plan = await Plan.findByPk(planId);
    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }
    const subscription = await Subscription.create({
      userId: req.session.user.id,
      planId,
      startDate: new Date(),
      endDate: plan.endDate,
      status: "active",
    });
    res
      .status(201)
      .json({ message: "Subscription created successfully", subscription });
  } catch (error) {
    res.status(500).json({ error: "Failed to create subscription" });
  }
};

exports.getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      where: { userId: req.session.user.id, status: "active" },
      include: [Plan],
    });
    if (!subscription) {
      return res
        .status(404)
        .json({ message: "Subscription not found or inactive." });
    }
    res.status(200).json({
      message: "Subscription found successfully.",
      subscription: subscription,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve subscription." });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const { planId } = req.body;
    const subscription = await Subscription.findOne({
      where: { userId: req.session.user.id, status: "active" },
      include: [Plan],
    });
    if (!subscription) {
      return res
        .status(404)
        .json({ message: "Active subscription not found." });
    }
    subscription.planId = planId;
    await subscription.save();
    res.status(200).json({
      message: "Subscription updated successfully.",
      subscription: subscription,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update subscription." });
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      where: { userId: req.session.user.id, status: "active" },
    });
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found." });
    }
    subscription.status = "canceled";
    subscription.endDate = new Date();
    await subscription.save();
    res.status(200).json({
      message: "Subscription canceled successfully.",
      subscription: subscription,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel subscription." });
  }
};
