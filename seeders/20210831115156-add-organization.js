module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('organizations', [{      
      org_code: 001,
      org_name: 'Public',
      org_email: 'testmail@yopmail.com',
      org_address: 'Street No.4, Doddakannahali, Sarjapur Main Road, Bengaluru',
      org_contact_no: '9090008778',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('organizations', null, {});
  }
};
