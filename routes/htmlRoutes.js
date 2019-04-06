var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Post.findAll({}).then(function(dbPosts) {
      res.render("index", {
        msg: "@TX",
        examples: dbPosts
      });
    });
  });

  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Post.findOne({ where: { id: req.params.id } }).then(function(dbPost) {
  //     res.render("example", {
  //       example: dbPost
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
