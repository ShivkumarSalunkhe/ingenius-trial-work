const { sequelize } = require('../config/db');
const User = require('./User');
const Subscription = require('./Subscription');
const Plan = require('./Plan');
const Payment = require('./Payment');


User.hasMany(Subscription, { foreignKey: 'userId' });
Subscription.belongsTo(User, { foreignKey: 'userId' });

Plan.hasMany(Subscription, { foreignKey: 'planId' });
Subscription.belongsTo(Plan, { foreignKey: 'planId' });

Subscription.hasMany(Payment, { foreignKey: 'subscriptionId' });
Payment.belongsTo(Subscription, { foreignKey: 'subscriptionId' });


module.exports = {
  sequelize,
  User,
  Plan,
  Subscription,
  Payment,
};
