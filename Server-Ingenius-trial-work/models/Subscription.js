// Subscription.js (and other model files)
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db'); // Adjust the path relative to User.js


const Subscription = sequelize.define('Subscription', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  planId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Subscription.sync().then(() => {
    console.log("User Model synced");
  });
  
module.exports = Subscription;
