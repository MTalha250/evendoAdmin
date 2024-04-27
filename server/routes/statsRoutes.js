import { getStats } from "../controllers/Stats.js";
import express from "express";

const router = express.Router();

router.get("/", getStats);

export default router;