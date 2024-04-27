import { create, list, del } from "../controllers/city.js";
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.post("/", verifyToken, verifyAdmin, create);
router.get("/", verifyToken, verifyAdmin, list);
router.delete("/:id", verifyToken, verifyAdmin, del);

export default router;
