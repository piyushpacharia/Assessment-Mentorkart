const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config();

const SignUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Invalid Data" });
  }
  try {
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User With This Email Is Already Exists",
      });
    } else {
      const hashPassword = bcrypt.hashSync(password, 10); 
      const newUser = await User.create({
        name,
        email,
        password: hashPassword,
      });
      const token = jwt.sign({ _id: newUser._id }, "contactForm12345");

      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      let mailDetails = {
        from: process.env.EMAIL,
        to: newUser.email,
        subject: "Activate Your Account",
        html: `
                    <h1>Welcome to contact form </h1>
                    <p>for activate your account you have to click on the link below</p>
                    <a href="http://localhost:8000/auth/activate-account/${token}"> Click here to verify your email  ></a>
                `,
      };
      await mailTransporter.sendMail(mailDetails);

      return res
        .status(200)
        .json({
          success: true,
          message: "Activation Link Is Sent On Your Email Verify It To Login",
        });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error While Sending Verification Link " + err.message,
      });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Invalid Data" });
  }
  try {
    User.findOne({ email }).then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Email Not Found" });
      }
      if (user.emailVerified == false) {
        return res
          .status(400)
          .json({ success: false, message: "Please Verify Your Email" });
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          const token = jwt.sign(
            {
              _id: user._id,
              name: user.name,
              email:user.email,
            },
            "contactForm12345"
          );
          return res
          .status(200)
            .json({
              success: true,
              message: "LoggedIn SuccessFully",
              token: token,
              name: user.name,
              _id: user._id,
              email:user.email,
            });
        } else {
          return res
            .status(401)
            .json({ success: false, message: "Incorrect Password" });
        }
      });
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const activateAccount = async (req,res)=>{
    const token = req.params.token;
    try{
       const data = jwt.verify(token,"contactForm12345");
        
       await User.findByIdAndUpdate(data._id,{
        emailVerified:true,
       })
       res.redirect("http://localhost:5173/")
      
    }catch(err){
        res.status(500).json({ success: false ,message:err.message});
    }
}

module.exports = { 
    SignUp,
    Login,
    activateAccount
 };
