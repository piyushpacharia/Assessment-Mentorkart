const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res ,next) => {
    const token = req.headers.authorization;

    try{
        const data = jwt.verify(token,"contactForm12345");
        req.user=(data);
        return next();
    }
    catch(err){
        return res
        .status(401)
        .json({success:false,message:err.message})
    }
}

module.exports = {isLoggedIn}