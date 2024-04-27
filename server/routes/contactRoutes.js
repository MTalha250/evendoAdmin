import { createContact } from "../controllers/Contact.js";
import verifyToken from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();

router.post("/", verifyToken, createContact);

export default router;