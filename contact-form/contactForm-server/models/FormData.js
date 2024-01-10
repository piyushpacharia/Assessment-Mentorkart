const mongoose =require("mongoose");

const formData = new mongoose.Schema({
    sender:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"contact-Form-Users"
    },
    receiver:{
        type:String,
        required:true,
        ref:"contact-Form-Users",
    },
    subject:{
        type:String,
        required:true,

    },
    message:{
        type:String,
        required:true,
    },
},
{
    timestamps:true,
})
module.exports = mongoose.model("contact-Form-Data",formData)