'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('work_shifts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      work_shift_name: {
        type: Sequelize.STRING
      },
      start_time: {
        type: Sequelize.TIME
      },
      end_time: {
        type: Sequelize.TIME
      },
      shift_start_date: {
        type: Sequelize.DATE
      },
      shift_end_date: {
        type: Sequelize.DATE
      },
      organization_id: {
        type: Sequelize.INTEGER,
        
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
    await queryInterface.dropTable('work_shifts');
  }
};