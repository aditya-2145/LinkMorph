const {getUser} =require("../services/auth");

function checkforAuthentication(req, res, next){
  const tokenCookies = req.cookies?.uid;
  if (!tokenCookies) return next();
  const token = tokenCookies;
  
  const user = getUser(tokenCookies);
  req.user = user;
  next();
}

function restrictToUser(roles = []){
  return function(req,res, next){
    
    if(!req.user) return res.redirect("./login");
    if(roles.includes(req.user.roles)) return res.end("UnAutherized");
    return next();
  };
}

module.exports={
  restrictToUser,
  checkforAuthentication,
}