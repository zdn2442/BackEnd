'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nilai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nilai.init({
    userId: DataTypes.INTEGER,
    guruId: DataTypes.INTEGER,
    mapelId: DataTypes.INTEGER,
    nilai: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'nilai',
  });
  return nilai;
};