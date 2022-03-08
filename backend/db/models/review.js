"use strict";
const { Model } = require("sequelize");
module.exports = (queryInterface, Sequelize) => {
  const Review = queryInterface.define(
    "Review",
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
        },
        rating: {
            allowNull: false,
            type: Sequelize.INTEGER,
            validate: {
                notEmpty: true,
            },
        comments: {
            type: Sequelize.TEXT,
        }
        }

    },
    {}
  );
  Review.associate = function (models) {
    Review.belongsTo(models.User, { foreignKey: 'user_id'})
    Review.belongsTo(models.Business, { foreignKey: 'business_id'})
  };
  return Review;
};
