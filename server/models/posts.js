const mongoose = require("mongoose");

const userpost = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,  //refernce to users _id
    ref: "User", //reference to user model
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  category: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model("Post", userpost);
module.exports = Post;
