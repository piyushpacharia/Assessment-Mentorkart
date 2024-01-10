const FormData = require("../models/FormData");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config()

const sendMail = async (req, res) => {
  const { receiverEmail, mailSubject, mailMessage } = req.body;
  const currentUser = req.user._id;
  if (!receiverEmail || !mailSubject || !mailMessage) {
    return res.status(400).json({ success: false, message: "Invalid Data" });
  }
  try {
    // sending the mail 
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    let mailDetails = {
      from: currentUser.email,
      to: receiverEmail,
      subject: mailSubject,
      text: mailMessage,
    };
    mailTransporter.sendMail(mailDetails);

    //storing the mail details in db
    await FormData.create({
      sender:currentUser,
      receiver:receiverEmail,
      subject:mailSubject,
      message:mailMessage,
    });
    return res.status(200).json({success:true,message:"Mail Sent SuccessFully"});
  } catch (err) {
    return res.status(500).json({success:false,message:"Internal Server Error " + err.message})
  }
};

const fetchMails = async(req,res)=>{
try{
  
  const mailDetails = await FormData.find({
    sender:req.user._id,
  })
  return res.status(200).json({success:true, mailDetails})
}
catch(err){
  return res.status(500).json({success:false,message:"Internal Server Error " + er.message})
}
}

module.exports = {sendMail , fetchMails};
