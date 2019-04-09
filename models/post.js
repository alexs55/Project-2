module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define(
    "Post",
    {
      name: DataTypes.STRING,
      subject: DataTypes.STRING,
      post: DataTypes.STRING,
      longitude: DataTypes.DOUBLE(12, 10),
      latitude: DataTypes.DOUBLE(12, 10)
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
      timestamps: true
    }
  );
  return Post;
};
