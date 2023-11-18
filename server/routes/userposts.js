const express = require("express");
const router = express.Router();
const Post = require("../models/posts.js");
const fetchUserID = require('../middleware/fetchuserID.js')

//create new post
router.post("/post",fetchUserID, async (req, res) => {
  try {
    const { heading, description, images, category } = req.body;

    const user_id = req.user_id

    const newPost = await Post.create({
      user_id,
      heading,
      description,
      images,
      category,
    });

    res.json({
      message: "post successful",
      post: newPost,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "failed", message: "internal server error" });
  }
});

//get all posts
router.get("/allposts", async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.json({
      post: allPosts,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "failed", message: "internal server error" });
  }
});

router.get("/food", async (req, res) => {
    try {
      const post = await Post.find({category:'food'});
      res.json({
          post
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

router.get("/healthandfitness", async (req, res) => {
  try {
    const post = await Post.find({category:'health and fitness'});
    res.json({
        post
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/travel", async (req, res) => {
    try {
      const post = await Post.find({category:'travel'});
      res.json({
          post
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/movie", async (req, res) => {
    try {
      const post = await Post.find({category:'movie'});
      res.json({
          post
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/education", async (req, res) => {
    try {
      const post = await Post.find({category:'education'});
      res.json({
          post
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;
