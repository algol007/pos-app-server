'use strict';
module.exports = (sequelize, DataTypes) => {
  const costumer = sequelize.define('costumer', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  costumer.associate = function(models) {
    // associations can be defined here
    costumer.belongsTo(models.order, {
      foreignKey: 'id',
      as: 'costumerOrder',
      sourceKey: 'id'
    });
  };
  return costumer;
};