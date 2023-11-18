const express = require("express");
const router = express.Router();
const Post = require("../models/posts");
const SavePost = require("../models/savePosts");
const fetchpostID = require("../middleware/fetchpostID");
const fetchUserID = require("../middleware/fetchuserID");

router.patch("/like/:postID", fetchpostID, fetchUserID, async (req, res) => {
  try {
    const postID = req.params.postID;
    const userID = req.user_id;

    const existingLike = await Like.findOne({
      user_id: userID,
      post_id: postID,
    });

    if (existingLike) {
      //decrement like count
      await Post.findByIdAndUpdate(postID, { $inc: { likeCount: -1 } });
      res.json({ status: "unliked", message: "Post unliked successfully" });
    } else {
      //increment like count
      await Post.findByIdAndUpdate(postID, { $inc: { likeCount: 1 } });

      res.json({ status: "liked", message: "Post liked successfully" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
});

router.patch("/save/:postID", fetchpostID, fetchUserID, async (req, res) => {
  try {
    const postID = req.params.postID;
    const userID = req.user_id;

    //check if post already saved
    const existingSavedPost = await SavePost.findOne({
      post_id: postID,
      user_id: userID,
    });
    if (existingSavedPost) {
      return res.json({
        status: "alread saved",
        message: "Post already saved",
      });
    }

    await savePost.create({ user_id: userID, post_id: postID });
    res.json({
      status: "saved",
      message: "Post saved successfully",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description, images, category } = req.body;
    await Post.findByIdAndUpdate(id, {
      heading,
      description,
      images,
      category,
    });
    res.status(200).json({
      status: "success",
      message: "post updated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: "internal server error",
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description, images, category } = req.body;
    await Post.findByIdAndDelete(id, {
      heading,
      description,
      images,
      category,
    });
    res.status(200).json({
      status: "success",
      message: "post deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: "internal server error",
    });
  }
});

module.exports = router;
