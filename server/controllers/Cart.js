import Cart from "../models/cart.js";
import User from "../models/User.js";
import { mongo } from "mongoose";

export const addToCart = async (req, res) => {
  const userId = await req.userId;
  try {
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const cartItem = await req.body;
    const { item, quantity, totalPrice } = cartItem;
    if (
      !item ||
      !quantity ||
      !totalPrice
    ) {
      res.status(400).json({ error: "Bad Request" });
    }
    // appending the new cart item to the user's cart
    await user.updateOne({
      $push: {
        cart: {
          $each: [{
            _id: new mongo.ObjectId(),
            item,
            totalPrice,
            quantity
          }]
        }
      }
    });
    await user.save();
    res.status(200).json({ user, cartItem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCartItem = async (req, res) => {
  const userId = await req.userId;
  try {
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
    }
    res.status(200).json({ result: user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCartItem = async (req, res) => {
  const userId = await req.userId;
  try {
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const { cartItemId } = await req.params;
    if (!cartItemId) {
      res.status(400).json({ error: "Unauthorized" })
    }
    // deleting the cart item
    const item = await Cart.findByIdAndDelete(cartItemId);
    // removing the cart item from the user's cart
    user.cart = user.cart.filter((item) => item._id.toString() !== cartItemId);
    await user.save();
    res.status(200).json({ user, message: "Deleted item from cart!" })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" })
  }
};
