import { getAllItems, deleteItem } from "../controllers/Item.js";
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllItems);
router.delete("/:itemId", verifyToken, verifyAdmin, deleteItem);

export default router;