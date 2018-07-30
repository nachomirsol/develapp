const express = require("express");
const router = express.Router();

// @route GET api/users/test
// @desc Test users route
// @access Private
router.get("/test", (req, res) => {
  res.json({ message: "users works" });
});

module.exports = router;
