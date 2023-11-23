const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const userpostSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // reference to users _id
    ref: "User", // reference to user model
    required: true,
  },
  posts: [postSchema],
});

const Post = mongoose.model("Post", userpostSchema);
module.exports = Post;
