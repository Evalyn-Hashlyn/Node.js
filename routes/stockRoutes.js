const express = require('express');
const router = express.Router();
// const connectEnsureLogin = require('connect-ensure-login');
const multer = require('multer');
const {ensureAuthenticated, ensureManager, ensureSalesAgent} = require('../customMiddleware/auth');

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

router.get("/registerFurniture", ensureAuthenticated, ensureManager, (req, res) => {
  res.render("register_furniture");
});

router.post("/registerFurniture", ensureAuthenticated, ensureManager, upload.single('funitureImage'), async (req, res) =>{
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
// Get furniture to update
router.get("/furniture/:id", async(req,res) =>{
  try {
    const furniture = await Furniture.findOne({_id:req.params.id});
    res.render("update_furniture", {item:furniture})
  } catch (error) {
    res.status(400).send('Unable to find item from the Database!')
    console.log(error)
  }
});

router.post("/furniture", async(req,res) =>{
  try {
     await Furniture.findByIdAndUpdate({_id:req.query.id}, req.body);
    res.redirect("/registeredFurniture")
  } catch (error) {
    res.status(400).send('Unable to Update furniture in the Database!')
    console.log(error)
  }
});

// Delete furniture
router.post("/deletefurniture", async(req,res) =>{
  try {
     await Furniture.deleteOne({_id:req.query.id});
    res.redirect("/registeredFurniture")
  } catch (error) {
    res.status(400).send('Unable to delete furniture in the Database!')
    console.log(error)
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

router.get("/managerDashboard", ensureAuthenticated, ensureManager, (req, res)=>{
  res.render("manager_dashboard")
});

router.get("/agentDashboard", ensureAuthenticated, ensureSalesAgent, (req,res)=>{
  res.render("agent_dashboard")
});

module.exports= router;