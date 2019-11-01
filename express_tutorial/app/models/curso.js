'use strict';
module.exports = (sequelize, DataTypes) => {
  const Curso = sequelize.define('curso', {
    sigla: DataTypes.STRING,
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5,40],
          msg: 'O nome precisa ter entre 5 e 40 caracteres.'
        }
      }
    },
    descricao: DataTypes.TEXT,
    id_area: DataTypes.INTEGER
  }, {
    underscored: true,
    tableName: 'Cursos',
  });
  Curso.associate = function(models) {
    // associations can be defined here
  };
  return Curso;
};