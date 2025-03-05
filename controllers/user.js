const user = require("../models/user");
const {v4: uuidv4} = require("uuid");
const {setUser} = require("../services/auth");
async function handleUserSignUp(req, res){
    const { username, email, password} = req.body;
    await user.create({
        username,
        email,
        password,
    }); 
    return res.redirect("/");
}
async function handleUserLogIn(req, res){
    const { email, password} = req.body;
    const User = await user.findOne({email, password});
    if(!User) return res.render("login",{ 
        error: "User Not Found"
    });
    
    const token = setUser(User);
    res.cookie("uid", token);
    return res.redirect("/");
}
module.exports={
    handleUserSignUp,
    handleUserLogIn,
}
