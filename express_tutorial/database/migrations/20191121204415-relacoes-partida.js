'use strict'

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
		return queryInterface
			.addConstraint('Partidas', ['id_user_1'], {
				type: 'foreign key',
				name: 'partida_id_user_1_fk',
				references: {
					table: 'Users',
					field: 'id'
				},
				onDelete: 'restrict',
				onUpdate: 'restrict'
			})
			.then(() =>
				queryInterface.addConstraint('Partidas', ['id_user_2'], {
					type: 'foreign key',
					name: 'partida_id_user_2_fk',
					references: {
						table: 'Users',
						field: 'id'
					},
					onDelete: 'restrict',
					onUpdate: 'restrict'
				})
			)
			.then(() =>
				queryInterface.addConstraint('Partidas', ['winner'], {
					type: 'foreign key',
					name: 'partida_id_winner_fk',
					references: {
						table: 'Users',
						field: 'id'
					},
					onDelete: 'restrict',
					onUpdate: 'restrict'
				})
			)
			.catch(err => {
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
		return queryInterface
			.removeConstraint('Partidas', ['id_user_1'])
			.then(() => queryInterface.removeConstraint('Partidas', ['id_user_2']))
			.then(() => queryInterface.removeConstraint('Partidas', ['winner']))
			.catch(err => {
				console.log(err)
				throw err
			})
	}
}
