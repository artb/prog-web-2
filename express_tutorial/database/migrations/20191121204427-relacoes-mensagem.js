'use strict'

const fk_1 = {
	type: 'foreign key',
	name: '_id_fk_mensagem_user',
	references: {
		table: 'Users',
		field: 'id'
	},
	onDelete: 'restrict',
	onUpdate: 'restrict'
}

const fk_2 = {
	type: 'foreign key',
	name: 'fk_mensagem_id_partida',
	references: {
		table: 'Partidas',
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
		return queryInterface
			.addConstraint('Mensagems', ['id_user'], fk_1)
			.then(() => queryInterface.addConstraint('Mensagems', ['id_partida'], fk_2))
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
			.removeConstraint('Mensagems', ['id_user'])
			.then(() => queryInterface.removeConstraint('Mensagems', ['id_partida']))
			.catch(err => {
				console.log(err)
				throw err
			})
	}
}
