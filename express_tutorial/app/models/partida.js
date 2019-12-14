'use strict';
module.exports = (sequelize, DataTypes) => {
  const Partida = sequelize.define('partida', {
    id_user_1: DataTypes.INTEGER,
    id_user_2: DataTypes.INTEGER,
    winner: DataTypes.INTEGER,
    fen: DataTypes.STRING
  }, {
    underscored: true,
    tableName: 'Partidas',
  });
  Partida.associate = function(models) {
    // associations can be defined here
    Partida.belongsTo(models.user, { as: 'uid_1', foreignKey: 'user_id_1' })
		Partida.belongsTo(models.user, { as: 'uid_2', foreignKey: 'user_id_2' })
  };
  return Partida;
};