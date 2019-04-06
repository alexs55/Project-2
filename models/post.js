module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define(
    "Post",
    {
      post: DataTypes.STRING,
      longitude: DataTypes.DOUBLE,
      latitude: DataTypes.DOUBLE
      // createdAt: {
      //   type: DataTypes.DATE(3),
      //   defaultValue: sequelize.literal("CURRENT_TIMESTAMP(3)")
      // },
      // updatedAt: {
      //   type: DataTypes.DATE(3),
      //   defaultValue: sequelize.literal("CURRENT_TIMESTAMP(3)")
      // }
    },
    {
      timestamps: false
    }
  );
  return Post;
};
