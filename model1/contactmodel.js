import mongoose from "mongoose";

const contactList = mongoose.Schema({

    name:String,
    company:String,
    email:String,
    phone:Number,
    description:String,
    date:{
        type:Date,
        default:Date.now(),
        immutable:true
    }
})

export const contact=mongoose.model("contact",contactList);