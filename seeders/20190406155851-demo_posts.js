"use strict";

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert(
      "Posts",
      [
        {
          post:
            "I'm at the Broken Spoke and need a dance partner! I'm the girl with big glasses and a red dress!",
          latitude: 30.240897,
          longitude: -97.785178
        },
        {
          post: "The traffic right here blows.",
          latitude: 30.263788,
          longitude: -97.735344
        },
        {
          post:
            "I'm in a Coding Bootcamp class right now and I'm so exhausted!",
          latitude: 30.287648,
          longitude: -97.727912
        },
        {
          post: "I hate Git soooo much right now! Save me!",
          latitude: 30.287648,
          longitude: -97.727912
        }
      ],
      {}
    );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete("Posts", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
