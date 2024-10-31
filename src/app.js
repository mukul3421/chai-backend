import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))  // jbh apne form bhra tbh humne data lia
app.use(express.urlencoded({extended:true, limit:"16kb"})) // jbh url se data aaye toh esse accept krna hai
app.use(express.static("public")) // ye configration islie taaki mere pass koi b image ya pdf kuch b aaye toh mai usse apne hi server pe store krke rkh raha hu
app.use(express.cookieParser()) // i use this taaki m user ki cookies ko access or set krr sku securely


export { app }