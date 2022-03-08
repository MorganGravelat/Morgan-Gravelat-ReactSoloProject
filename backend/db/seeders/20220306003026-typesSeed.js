"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Seeds",
      [
        {
            business_type: 'Restaraunt',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            business_type: 'Coffee Shop',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            business_type: 'Hotel',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Businesses", null, {});
  },
};
