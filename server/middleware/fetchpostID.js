const Posts = require("../models/posts");

const fetchPostIDMiddleware = async (req, res,next) => {
  try {
    const postID = req.params._id;

    const post = await Posts.findOne({ "_id":postID });
    if (!post) {
      return res.status(404).json({
        status: "failed",
        message: "Post not found",
      });
    }

    req.post = post;
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
