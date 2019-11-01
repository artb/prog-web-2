'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Areas', [
      {
      id: 1,
        nome: 'Ciências Exatas',
        created_at: new Date(),
        updated_at: new Date()
      }, {
      id: 2,
        nome: 'Ciências Humanas',
        created_at: new Date(),
        updated_at: new Date()
      }, {
      id: 3,
        nome: 'Ciências Biológicas',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Areas', {}, {});
  }
};
