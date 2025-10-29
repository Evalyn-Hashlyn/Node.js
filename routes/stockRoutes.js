const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const multer = require('multer');

const Furniture = require('../models/Furniturestock');
const Wood = require('../models/Woodstock');

// Image upload configs
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })
// connectEnsureLogin.ensureLoggedIn(),
router.get("/registerFurniture", (req, res) => {
  res.render("register_furniture");
});

router.post("/registerFurniture",  upload.single('funitureImage'), async (req, res) =>{
  try {
    const furniture = new Furniture(req.body)
    furniture.furnitureImage = req.file.path
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

router.get("/registeredFurniture", async(req, res)=>{
  try {
    const furnitureStock = await Furniture.find();
    res.render("furniture", {furnitureStock})
  } catch (error) {
    console.error("Error getting furniture from the DB!")
    res.redirect("/")
  }
});

router.get("/registeredWood", async(req, res)=>{
  try {
    const woodStock = await Wood.find();
    res.render("wood", {woodStock} )
  } catch (error) {
    console.error("Error getting wood stock from the DB!")
    res.redirect("/registeredWood")
  }
});

module.exports= router;