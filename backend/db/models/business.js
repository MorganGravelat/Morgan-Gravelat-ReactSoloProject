'use strict';
const { Model } = require('sequelize');
module.exports = (queryInterface, Sequelize) => {
  const Business = queryInterface.define('Business', {
      owner_id: {
          allowNull: false,
          type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
          notEmpty: true,
        }
      },
      description: {
        type: Sequelize.TEXT,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(50),
        validate: {
            max: 50,
            notEmpty: true
        }
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(85),
        validate: {
          max: 85,
          notEmpty: true
        }
      },
      type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
            notEmpty: true
        }
      },
      state: {
        type: Sequelize.STRING(50),
        validate: {
          max: 50
        },
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.STRING(10),
        validate: {
          max: 10,
          notEmpty: true,
        }
      },
      image_url: {
        allowNull: false,
        type: Sequelize.TEXT,
        defaultValue: 'https://drive.google.comuc?id=1-Rsq_JT6eBrQfmPyWfKTVvxxkYI1GzGY',
      },
  }, {});
  Business.associate = function(models) {
    Business.hasMany(models.Review, {foreignKey: 'business_id'})
    Business.belongsTo(models.User, { foreignKey: 'owner_id' });
    Business.belongsTo(models.Type, { foreignKey: 'type_id' });
    const columnMapping = {
        through: 'Like',
        otherKey: 'user_id',
        foreignKey: 'business_id'
        }
        Business.belongsToMany(models.User, columnMapping);
  };
  return Business;
};