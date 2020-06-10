const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const header = req.get("Authorization");
  if (!header) {
    req.isAuth = false;
   return next();
  }
  const token = header.split(" ")[1];

  try{
    const data = jwt.verify(token, process.env.SECRET_TOKEN);
    if (!data) {
      req.isAuth = false;
     return next();
    }
    req.isAuth = true;
    req.userID = data.userID;
    return next();
  }catch(err){
     req.isAuth=false
     return next()
  }
 
};

module.exports = isAuth