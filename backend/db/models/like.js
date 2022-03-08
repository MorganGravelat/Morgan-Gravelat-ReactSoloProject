"use strict";
const { Model } = require("sequelize");
module.exports = (queryInterface, Sequelize) => {
  const Like = queryInterface.define(
    "Like",
    {
        user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            validate: {
              notEmpty: true,
            },
        },
        business_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            validate: {
                notEmpty: true,
            },
        }
    },
    {}
  );
  Like.associate = function (models) {
    Like.belongsTo(models.User, { foreignKey: 'user_id'})
    Like.belongsTo(models.Business, { foreignKey: 'business_id'})
  };
  return Like;
};
