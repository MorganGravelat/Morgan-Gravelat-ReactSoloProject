"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Businesses",
      [
        {
          owner_id: 1,
          title: "Big Business",
          description: "This business, is seriously big!",
          address: "740 BigSquare",
          city: "Big City",
          type_id: 2,
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
