const Posts = require("../models/posts");

const fetchPostIDMiddleware = async (req, res, next) => {
  try {
    const postID = req.params.postID;
    const post = await Posts.findOne({ "posts._id": postID });

    if (!post) {
      return res.status(404).json({
        status: "failed",
        message: "Post not found",
      });
    }
    const specificPost = post.posts.find((p) => p._id.toString() === postID);
    if (!specificPost) {
      return res.status(404).json({
        status: "failed",
        message: "Specific post not found in the array",
      });
    }

    req.specificPost = specificPost;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: "internal server error",
    });
  }
};

module.exports = fetchPostIDMiddleware;
