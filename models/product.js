'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {});
  product.associate = function(models) {
    // associations can be defined here
    product.belongsTo(models.category, {
      foreignKey: 'categoryId',
      as: 'productCategory',
      sourceKey: 'id'
    });
    product.hasMany(models.order_detail, {
      foreignKey: 'id',
      as: 'productDetail',
      sourceKey: 'id'
    });
  };
  return product;
};