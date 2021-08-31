'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Organization.hasMany(models.User,
            // { sourceKey: 'org_id', foreignKey: 'organization_id', as: 'organizations', }
            {
            foreignKey: 'organization_id',
            as: 'organizations',
          }
          );
        Organization.hasOne(models.WorkShift);
    }
  };
  Organization.init({
    org_code: DataTypes.INTEGER,
    org_name: DataTypes.STRING,
    org_email: DataTypes.STRING,
    org_address: DataTypes.STRING,
    org_contact_no: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Organization',
    underscored: true
  });
  return Organization;
};