'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('organizations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      org_code: {
        type: Sequelize.INTEGER
      },
      org_name: {
        type: Sequelize.STRING
      },
      org_email: {
        type: Sequelize.STRING
      },
      org_address: {
        type: Sequelize.STRING
      },
      org_contact_no: {
        type: Sequelize.STRING
      },      
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('organizations');
  }
};