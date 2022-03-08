"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Businesses",
      [
        {
            owner_id: 1,
            title: "Too much sauce",
            description: "Gluten-free cafe featuring signature & customized bowls with a variety of global sauces & desserts.",
            address: "1430 N Mills Ave #170",
            city: "Orlando",
            type_id: 1,
            state: "Florida",
            zipCode: '32803',
            image_url: 'https://drive.google.com/uc?id=1csfi1U88719Ohzq4BbbmLuaMmKz5E7CR',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            owner_id: 1,
            title: "LongHorn Steakhouse",
            description: "Casual steakhouse chain known for grilled beef & other American dishes in a ranch-style space.",
            address: "309 N Alafaya Trail",
            city: "Orlando",
            type_id: 1,
            state: "Florida",
            zipCode: '32828',
            image_url: 'https://drive.google.com/uc?id=1aOuliqr7-WjXNWR453-DEmKP7-OuavtD',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            owner_id: 1,
            title: "Dustin's Bar-B-Q",
            description: "Take a little barbecue break from your work day!",
            address: "14516 E Colonial Dr",
            city: "Orlando",
            type_id: 1,
            state: "Florida",
            zipCode: "32826",
            image_url: 'https://drive.google.com/uc?id=12sN9Bd4f_NXCeJPIa-MtHxLRGkQUbwX1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            owner_id: 1,
            title: "DoubleTree by Hilton Hotel Orlando East-UCF Area",
            description: "This unpretentious hotel is 2 miles from the UCF Arboretum, 4 miles from Blanchard Park and 19 miles from downtown Orlando.",
            address: "12125 High Tech Ave",
            city: "Orlando",
            type_id: 2,
            state: "Florida",
            zipCode: "32817",
            image_url: 'https://drive.google.com/uc?id=1QAdRDs5KqYR3t-_bDMjxc4j7JX_sPlEq',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            owner_id: 1,
            title: "Hilten Garden Inn",
            description: "A 1-minute drive from State Highway 50, this modern hotel is a 2.4-mile [drive/walk] from the University of central Florida. There's a 24/7 market, in addition to the cooked-to-order breakfast (fee) and casual on-site restaurant with cocktail service.",
            address: "1959 N Alafaya Trail",
            city: "Orlando",
            type_id: 2,
            state: "Florida",
            zipCode: "32826",
            image_url: 'https://drive.google.com/uc?id=1mHbSxiP0dh86gebPI4zjlAOeEn6VAK5a',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            owner_id: 1,
            title: "DUO58 Community Coffee Bar & Cafe",
            description: "DUO58 aims to provide hope to our local community, and the world, through nonprofit partnerships, workforce programs, healthy food service and social enterprise.",
            address: "2842 S Alafaya Trail ",
            city: "Orlando",
            type_id: 3,
            state: "Florida",
            zipCode: "32826",
            image_url: 'https://drive.google.com/uc?id=1Jl2dqWhLFZINWdxWAfUKoSG-5FvpeE4-',
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
