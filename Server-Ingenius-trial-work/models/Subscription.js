const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db'); 

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
    defaultValue: null,
    allowNull: true,
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
