import express from 'express';
import dotenv from "dotenv";
import path from "path";
import { connectDB } from './config/DB.js';
import Item from './models/item.js';
import mongoose from 'mongoose';
import itemRoutes from './routes/item.route.js';


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

const __dirname=path.resolve();

app.use(express.json());

app.use("/api/items",itemRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*", (req,res) =>{
        res.sendFile(path.resolve(__dirname,"frontend","dist", "index.html"));
    })
}

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server started at port ${PORT}`);
})


