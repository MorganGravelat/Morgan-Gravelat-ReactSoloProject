'use strict';
const { Model } = require('sequelize');
module.exports = (queryInterface, Sequelize) => {
  const Business = queryInterface.define('Business', {
      owner_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          validate: {
            notEmpty: true,
          }
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
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(85),
      },
      type_id: {
        type: Sequelize.INTEGER,
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      image_url: {
        allowNull: false,
        type: Sequelize.TEXT,
        defaultValue: 'https://drive.google.com/uc?id=19uGJseAOxtRpd5JeDKhhHnnQN_Pf5-35',
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
