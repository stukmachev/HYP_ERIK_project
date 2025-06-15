'use strict';

// npx sequelize-cli migration:generate --name create-teachers
// npx sequelize-cli db:migrate

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teachers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      surname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      qualification: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      photos: {
        allowNull: false,
        type: Sequelize.JSON,
        defaultValue: []
      },
      cv: {
        allowNull: false,
        type: Sequelize.JSON,
        defaultValue: {}
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Teachers');
  }
};
