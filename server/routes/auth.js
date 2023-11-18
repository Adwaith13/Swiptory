const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Users = require("../models/users.js");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    //check input field
    if (!username || !password) {
      return res.status(422).json({
        status: "failed",
        message: "username and password required",
      });
    }

    //checking if user exists
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        status: "failed",
        message: "user already exists",
      });
    }

    //encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      username,
      password: encryptedPassword,
    });

    res.status(201).json({
      status: "success",
      message: "user registered successfully",
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    //check input field
    if (!username || !password) {
      return res.status(422).json({
        status: "failed",
        message: "username and password required",
      });
    }

    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "authentication failed",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        status: "failed",
        message: "authentication failed",
      });
    }

    const loginToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: 14400,
    });

    res.status(200).json({
      status: "success",
      message: `${user.username} logged in`,
      loginToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: "internal server error",
    });
  }
});

module.exports = router
