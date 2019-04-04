module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      post: DataTypes.STRING,
      longitude: DataTypes.DECIMAL,
      latitude: DataTypes.DECIMAL,
      created_at: DataTypes.DATE
    });
    return Post;
  };
  