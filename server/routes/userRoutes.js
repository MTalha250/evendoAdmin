import { login, register, getUser, verify, getAllUsers } from "../controllers/User.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.get("/verify/:id", verifyToken, verify);

export default router;