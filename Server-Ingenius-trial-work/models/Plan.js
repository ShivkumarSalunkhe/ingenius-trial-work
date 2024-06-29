// models/plan.js
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db'); // Adjust path as necessary

const Plan = sequelize.define('Plan', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

module.exports = Plan;
