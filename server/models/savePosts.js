const mongoose = require("mongoose");

const savePostSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

const SavePost = mongoose.model("SavePost", savePostSchema);
module.exports = SavePost;
