const User = require("/User.js");
const Post = require("/Post.js");
const Comment = require("/Comment.js");

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

module.exports = { User, Post, Comment };
