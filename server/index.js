import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import statRoutes from "./routes/statsRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://admin.evendo.pk",
      "https://evendo.pk",
      "*",
    ],
  })
);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB connected");
});

db.on("error", (error) => {
  console.log(error);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// ROUTES
app.use("/auth", userRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/contact", contactRoutes);
app.use("/stats", statRoutes);
app.use("/shop", shopRoutes);
app.use("/item", itemRoutes);
app.use("/city", cityRoutes);

//Setting up s3

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
