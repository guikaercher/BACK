const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [{
      id: uuidv4(),
      login: 'letscode',
      password: 'lets@123',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], { returning: true });

    await queryInterface.bulkInsert('cards', [{
      id: uuidv4(),
      title: 'My first card',
      content: 'This is the content of my first card',
      list: 'ToDo',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('cards', { title: 'My first card' }, {});
    await queryInterface.bulkDelete('users', { login: 'letscode' }, {});
  }
};
