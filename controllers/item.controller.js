import Item from "../models/item.js";
import mongoose from "mongoose";

export const getItems = async (req,res)=>{
    try{
        const items = await Item.find({});
        res.status(200).json({success:true,data:items});
    }
    catch(error){
        console.log("Error in fetching the items",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export const createItem = async (req,res)=>{

    const item=req.body;

    if(!item.name || !item .price){
        return res.status(400).json({success:false, message: "Please fill in all the fields"});
    }

    const newItem = new Item(item);

    try{

        await newItem.save();
        res.status(201).json({success:true, data:newItem});
    }
    catch(error){

        console.error("Error in Create Item:", error.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }

}

export const updateItem = async (req,res)=>{
    const {id}=req.params;

    const item = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message: "Invalid id"});
    }
    
    try{

        const updatedItem = await Item.findByIdAndUpdate(id,item,{new:true});
        res.status(200).json({sucess:true,data:updatedItem});
    }
    catch(error){
        res.status(500).json({sucess:false,message:"Internal Server Error"});
    }
}

export const deleteItem = async (req,res) =>{

    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid id"});
    }

    try{
        await Item.findByIdAndDelete(id);
        res.status(200).json({sucess:true,message:"Item deleted"});
    }
    catch(error){
        res.status(500).json({sucess:false,message:"Item not found"});
    }
}