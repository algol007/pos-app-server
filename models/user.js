'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    image: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.order, {
      foreignKey: 'id',
      as: 'userOrder',
      sourceKey: 'id'
    });
  };
  return user;
};