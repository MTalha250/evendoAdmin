import { createOrder, getOrdersByUser, getAllOrders, deleteOrder } from "../controllers/Order.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import express from "express";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getOrdersByUser);
router.get("/all", verifyToken, verifyAdmin, getAllOrders);
router.delete("/:orderId", verifyToken, verifyAdmin, deleteOrder);

export default router;