// 2nd approach
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './.env'
})



connectDB()






// import connectDB from './db/index.js';

// console.log("Mongo URI from db/index.js:", process.env.MONGODB_URI);


// // Start MongoDB connection
// connectDB();















// 1st approach everything in the index file
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
/*
import express from "express"
const app = express()

( async ()=>{
    try {
       await mongoose.connect(`${process.env.
        MONGODB_URI}/${DB_NAME}`)
        app.on("ERROR: ",(error)=>{ //kya pata db connect hone ke baad hamara express error dera ho ye uske lie likha hai
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR: ",error)
        throw error;
    }
})()
*/