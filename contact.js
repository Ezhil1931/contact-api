import express from "express";

import mongoose from "mongoose";
import cors from "cors";
import { contact } from "./model1/contactmodel.js" ;
const app=express();


const PORT=process.env.PORT||4000;

const mongodbUrl="mongodb+srv://ezhilbruce:ezhil1940@mydatabase.e2ac7dw.mongodb.net/?retryWrites=true&w=majority&appName=MyDatabase"
app.use(express.json())

app.use(cors())


app.get('/',(req,res)=>{
res.send("Hello COntact");
})

app.post("/contact",async(req,res)=>{

    try{

   if(!req.body.name){
    return res.send("Give the proper details");

   } 


const newList={
    name:req.body.name,
    company:req.body.compny,
    email:req.body.email,
    phone:req.body.phone,
    description:req.body.description
}
  const list = await contact.create(newList)
return res.send(list);

    }
    catch(err){
res.send("Error in the create opration");
    
}

})


app.get("/contact",async(req,res)=>{
    try{

    
const books= await contact.find({})
        res.status(201).send(books) 
    }
    catch(err){
console.log(err)
res.status(501).send({sms:'Can not get book details'})    
}
})



app.delete("/contact/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const result=await contact.findByIdAndDelete(id)
    
        if(!result){
            return res.send({sms:"The contact is not found"})
        }
        return res.send({sms:"The contact is deleted"})
    }
        catch(err){
    res.send({sms:"The Error at delete process"})
        }
    })
    

const start=()=>{


    mongoose.connect(mongodbUrl)
    .then(()=>{
    console.log("the data base connected")
    
    app.listen(PORT,()=>{
        console.log(`the server is running ${PORT}`)
    })
    
    })
    .catch((err)=>{
    
    console.log(err)
    
    })
    
    
    }
    
    start();