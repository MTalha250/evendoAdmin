import { addToCart, deleteCartItem, getCartItem } from "../controllers/Cart.js";
import verifyToken from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();

router.post("/", verifyToken, addToCart);
router.delete("/:cartItemId", verifyToken, deleteCartItem);
router.get("/", verifyToken, getCartItem);
// router.get("/verify/:id", verifyToken, verify);

export default router;