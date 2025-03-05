const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const {restrictToUser} = require("../middlewares/auth")
router.get("/",restrictToUser(["NORMAL", "ADMIN"]),async (req, res)=>{
    if(!req.user) return res.redirect("/login")
    const allUsers = await URL.find({ createdBy: req.user._id });
    return res.render("home",{
        urls: allUsers,
    });
});
router.get("/admin/urls" , restrictToUser(["ADMIN"]),async (req, res)=>{
    if(!req.user) return res.redirect("/user/login")
    const allUsers = await URL.find({});
    return res.render("home",{
        urls: allUsers,
    }); 
});
router.get("/signup",async (req, res)=>{
    return res.render("signup");
});
router.get("/login",async (req, res)=>{
    return res.render("login");
});
module.exports=router;