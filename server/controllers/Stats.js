import User from "../models/User.js";
import Order from "../models/order.js";
import CartItem from "../models/cart.js";
import Contact from "../models/Contact.js";
import Item from "../models/item.js";
import Shop from "../models/shop.js";

export const getStats = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const orderCount = await Order.countDocuments();
        const cartCount = await CartItem.countDocuments();
        const contactCount = await Contact.countDocuments();
        const itemCount = await Item.countDocuments();
        const shopCount = await Shop.countDocuments();
        return res.json({
        userCount,
        orderCount,
        cartCount,
        contactCount,
        itemCount,
        shopCount,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("An error occurred");
    }
};