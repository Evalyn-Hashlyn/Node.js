const express = require('express');
const router = express.Router();
const passport = require('passport');

const Registration = require('../models/Registration');

router.get("/register", (req, res) => {
  res.render("signup");
});

router.post("/register", async(req, res) =>{
  try {
    const newUser = new Registration(req.body)
    console.log(newUser)
    let user = await Registration.findOne({
      email: req.body.email
    })
    if(user){
      return res.status(400).send('Not registered, that user already exists.')
    }else{
      await Registration.register(newUser, req.body.password,(error)=>{
      if(error){
        throw error;
      }
    })
    res.redirect("/")
    }
  } catch (error) {
    console.error(error.message)
    res.status(400).send('Sorry something went wrong')
  }
});

router.get("/login", (req, res)=>{
  res.render("login")
})

router.post("/login", passport.authenticate("local", {failureRedirect:"/login", failureFlash:true}), (req, res) =>{
  req.session.user = req.user
  req.flash("success_msg", `Welcome back, ${req.user.username}!`);
  //  console.log(req.user)
  if(req.user.role==="Manager"){
    res.redirect("/managerDashboard")
  }else if(req.user.role==="Sales-Agent"){
    res.redirect("/agentDashboard")
  }else{ 
    res.render("nonuser")
  }
});

router.get("/logout", (req,res)=>{
  if(req.session){
    req.session.destroy((error)=>{
      if(error){
        return res.status(500).send('Error logging out!')
      }
      res.redirect("/")
    })
  }
});

router.get("/users", async(req,res)=>{
  try {
    const users = await Registration.find().sort({$natural:-1})
    res.render("registered_users", {users})
  } catch (error) {
    console.error("Error getting user from the DB!")
    res.status(400).send("Unable to get users from the DB!")
  }
});

//last line
module.exports = router;