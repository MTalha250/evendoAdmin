import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import { getAllShops, deleteShop } from "../controllers/ShopControllers.js";

import express from "express";
const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllShops);
router.delete("/:shopId", verifyToken, verifyAdmin, deleteShop);

export default router;