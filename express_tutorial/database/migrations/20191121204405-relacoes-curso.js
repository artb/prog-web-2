"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("curso", ["areaId"], {
      type: "foreign key",
      name: "curso_id_area_fk",
      references: {
        table: "area",
        field: "id"
      },
      onDelete: "restrict",
      onUpdate: "restrict"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "curso",
      "curso_id_area_fk"
    )
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
