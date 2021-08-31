const bcrypt = require('bcrypt');
const config = require('../config/constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{      
      user_name: 'John Smith',
      email: 'johns@yopmail.com',
      password: bcrypt.hashSync('passusr@123', config.saltRounds),
      address: 'house no-1004, Street No.21,  Doddakannahali, Sarjapur Main Road, Bengaluru',
      organization_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
