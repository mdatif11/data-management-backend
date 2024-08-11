import express from "express";
import mongoose from "mongoose";
import { createItem, deleteItem, getItems, updateItem } from "../controllers/item.controller.js";
import Item from '../models/item.js';

const router=express.Router();

router.get("/",getItems);

router.post("/", createItem);

router.put("/:id",updateItem)

router.delete("/:id",deleteItem);

export default router;