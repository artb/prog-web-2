'use strict'

const fk = {
	type: 'foreign key',
	name: 'curso_id_area_fk',
	references: {
		table: 'Areas',
		field: 'id'
	},
	onDelete: 'restrict',
	onUpdate: 'restrict'
}

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
		return queryInterface.addConstraint('Cursos', ['id_area'], fk).catch(err => {
			console.log(err)
			throw err
		})
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
		return queryInterface.removeConstraint('Cursos', 'curso_id_area_fk')
	}
}
