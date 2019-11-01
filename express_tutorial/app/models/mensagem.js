'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define('mensagem', {
    id_partida: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    mensagem: DataTypes.STRING
  }, {
    underscored: true,
    tableName:'Mensagems',
  });
  Mensagem.associate = function(models) {
    // associations can be defined here
  };
  return Mensagem;
};