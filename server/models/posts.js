const mongoose = require("mongoose");

const userpost = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,  //refernce to users _id
    ref: "Users", //reference to user model
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
});

const Post = mongoose.model("Post", userpost);
module.exports = Post;
