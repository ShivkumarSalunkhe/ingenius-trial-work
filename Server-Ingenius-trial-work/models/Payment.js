// Payment.js
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db'); // adjust path as necessary

const Payment = sequelize.define('Payment', {
  subscriptionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Payment;
