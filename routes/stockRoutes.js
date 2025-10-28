const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

const Furniture = require('../models/Furniturestock');
const Wood = require('../models/Woodstock');

// connectEnsureLogin.ensureLoggedIn(),
router.get("/registerFurniture", (req, res) => {
  res.render("register_furniture");
});

router.post("/registerFurniture", async (req, res) =>{
  try {
    const furniture = new Furniture(req.body)
    console.log(furniture)
    await furniture.save()
    res.redirect("/registerWood")
  } catch (error) {
    console.error(error)
    res.redirect("/registerFurniture")
  }
});

router.get("/registerWood", (req, res) => {
  res.render("register_wood");
});

router.post("/registerWood", async (req, res) => {
  try {
    const wood = new Wood(req.body)
    console.log(wood)
    await wood.save()
    res.redirect("/registerFurniture")
  } catch (error) {
    console.error(error)
    res.redirect("/registerWood")
  }
});

module.exports= router;
// router.get("/user", (req, res) => {
//   res.render("user");
// });