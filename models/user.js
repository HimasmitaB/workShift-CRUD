'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Organization, {
        foreignKey: 'organization_id',
        // as: 'user'
      });
    }
  };
  User.init({
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    organization_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    underscored: true
  });
  return User;
};