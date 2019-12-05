// 'use strict';
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('area', {
    nome: DataTypes.STRING,
    allowNull: false
  }, {
    underscored: true,
    tableName: 'Areas',
  });
  Area.associate = function (models) {
    // associations can be defined here
  };
  return Area;
};