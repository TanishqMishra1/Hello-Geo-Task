module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        permalink: 'user1',
        name: 'User One',
        email: 'user1@example.com',
        password: 'password1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permalink: 'user2',
        name: 'User Two',
        email: 'user2@example.com',
        password: 'password2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
