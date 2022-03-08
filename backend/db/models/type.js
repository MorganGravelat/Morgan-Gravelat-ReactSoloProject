"use strict";
const { Model } = require("sequelize");
module.exports = (queryInterface, Sequelize) => {
  const Type = queryInterface.define(
    "Type",
    {
      business_type: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
          max: 100,
          notEmpty: true,
        },
      },
    },
    {}
  );
  Type.associate = function (models) {
    Type.hasMany(models.Business, { foreignKey: "type_id" });
  };
  return Type;
};
