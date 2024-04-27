import dotenv from "dotenv";
import User from "../models/User.js";
import Contact from "../models/Contact.js";
dotenv.config();

// Register
export const createContact = async (req, res) => {

  const { name, email, message, phone } = await req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
    }

    const newContact = await Contact.create({
      name,
      email,
      message,
      phone,
      userId
    })

    await newContact.save();
    return res.json({ newContact });

  } catch (error) {
    console.log(error)
    return res.status(500).send("An error occurred");
  }
}

