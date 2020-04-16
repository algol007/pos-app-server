'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    costumerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    invoice: DataTypes.STRING
  }, {});
  order.associate = function(models) {
    // associations can be defined here
  };
  return order;
};