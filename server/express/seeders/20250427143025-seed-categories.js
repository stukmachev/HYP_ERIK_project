'use strict';

// npx sequelize-cli seed:generate --name seed-categories
// npx sequelize-cli db:seed:all

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Body',
        description: 'Activities and practices focused on physical strength, flexibility, and endurance.',
        photos: JSON.stringify([
          { path: 'img/categories/body1.jpg', priority: 1 },
          { path: 'img/categories/body2.jpg', priority: 2 }
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Soul',
        description: 'Practices that nurture emotional well-being, inner peace, and spiritual connection.',
        photos: JSON.stringify([
          { path: 'img/categories/soul1.jpg', priority: 1 },
          { path: 'img/categories/soul2.jpg', priority: 2 }
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mind',
        description: 'Exercises aimed at mental clarity, mindfulness, and cognitive strength.',
        photos: JSON.stringify([
          { path: 'img/categories/mind1.jpg', priority: 1 },
          { path: 'img/categories/mind2.jpg', priority: 2 }
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
