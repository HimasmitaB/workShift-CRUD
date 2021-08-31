'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkShift extends Model {
    static associate(models) {
        WorkShift.belongsTo(models.Organization, {
            foreignKey: 'organization_id',
            as: 'workshift'
          });
    }
  };
  WorkShift.init({  
    work_shift_name: DataTypes.STRING,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    shift_start_date: DataTypes.DATE,
    shift_end_date: DataTypes.DATE,
    organization_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WorkShift',
    underscored: true
  });
  return WorkShift;
};