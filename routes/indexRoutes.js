const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.render("landing", { title: "Mayondo Wood Inventory System" });
});

//last line
module.exports = router;

