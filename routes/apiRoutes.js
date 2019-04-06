//require models/post.js
var db = require("../models");
// var Op = Sequelize.Op;

module.exports = function(app) {
  // Get all examples
  app.get("/api/posts", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Create a new example
  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Delete an example by id
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({ where: { id: req.params.id } }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  /********* Real Routes **********/

  // Create a new post
  app.post("/api/post", function(req, res) {
    db.Post.create(req.body).then(function(post) {
      res.json(post);
    });
  });

  // Get all posts
  app.get("/api/posts", function(req, res) {
    db.Post.findAll({}).then(function(posts) {
      res.json(posts);
    });
  });

  // Get posts near me
  app.get("/api/posts/:latitude/:longitude", function(req, res) {
    db.Post.find(req.body).then(function(posts) {
      res.json(posts);
    });
  });

  // Get posts near me
  app.get("/api/posts/nearme", function(req, res) {
    // let latitudeLowEnd = req.body.latitude - 1;
    // let latitudeHighEnd = req.body.latitude + 1;
    // let longitudeLowEnd = req.body.longitude - 1;
    // let longitudeHighEnd = req.body.longitude + 1;

    // https://gis.stackexchange.com/questions/142326/calculating-longitude-length-in-miles
    // I know from here that in case of latitude 1° ≈ 69 miles and that longitude varies:
    var nearMeMiles = 1000.0;
    var degreesPerMile = 1.0 / 69.0;

    var allowance = (nearMeMiles / 2.0) * degreesPerMile;
    console.log("allowance = ", allowance);
    console.log(req.body);

    var lowerLatitude = req.body.latitude - allowance;
    var upperLatitude = req.body.latitude + allowance;
    var lowerLongitude = req.body.longitude - allowance;
    var upperLongitude = req.body.longitude + allowance;
    console.log("lowerLatitude = ", lowerLatitude);
    console.log("upperLatitude = ", upperLatitude);
    console.log("lowerLongitude = ", lowerLongitude);
    console.log("upperLongitude = ", upperLongitude);

    db.Post.findAll({
      where: {
        latitude: {
          $between: [lowerLatitude, upperLatitude]
        },
        longitude: {
          $between: [lowerLongitude, upperLongitude]
        }
      }
    }).then(function(posts) {
      res.json(posts);
    });
  });
  // SELECT * FROM post WHERE authorId = 12 OR authorId = 13;

  //   db.Post.find({
  //     where: { latitude: }
  //   }).then(function(posts) {
  //     res.json(posts);
  //   });
  // });

  // [Op.between]: [6, 10],

  // GET one owner by id
  // app.get('/owner/:id', (req, res) => {
  //   const id = req.params.id;
  //   db.owners.find({
  //     where: { id: id }
  //   })
  //     .then(owner => {
  //       res.json(owner);
  //     });
  // });

  // Delete post by id
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({ where: { id: req.params.id } }).then(function(
      deleteStatus
    ) {
      res.json(deleteStatus);
    });
  });
};
