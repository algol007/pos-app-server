'use strict';
module.exports = (sequelize, DataTypes) => {
  const order_detail = sequelize.define('order_detail', {
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  order_detail.associate = function(models) {
    // associations can be defined here
    order_detail.belongsTo(models.order, {
      foreignKey: 'orderId',
      as: 'orderDetail',
      sourceKey: 'id'
    });
    order_detail.belongsTo(models.product, {
      foreignKey: 'productId',
      as: 'productDetail',
      sourceKey: 'id'
    });
  };
  return order_detail;
};