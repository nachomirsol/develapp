const express = require("express");
const router = express.Router();

const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../../config/config");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route GET api/users/test
// @desc Test users route
// @access Private
router.get("/test", (req, res) => {
  res.json({ message: "users works" });
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let body = req.body;
  User.findOne({ email: body.email }).then(user => {
    if (user) {
      errors.email = "Email already exist";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });

      const newUser = new User({
        name: body.name,
        email: body.email,
        avatar: avatar,
        password: bcrypt.hashSync(body.password, 10)
      });

      newUser.save((err, userDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err: err
          });
        }

        res.json({
          ok: true,
          newUser: userDB
        });
      });
    }
  });
});

// @route GET api/users/login
// @desc Login user / returns JWT Token
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let body = req.body;
  const email = body.email;
  const password = body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // check password, compare the introduced password in plain text with hashed password from the db
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Match

        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };

        // Sign Token
        jwt.sign(
          payload,
          config.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/users/current
// @desc Return current User
// @access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
