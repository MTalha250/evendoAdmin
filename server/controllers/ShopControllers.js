import Shop from "../models/shop.js";
import Item from "../models/item.js";
import Order from "../models/order.js";

export const getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find();
        return res.json({ shops });
    } catch (error) {
        console.log(error);
        return res.status(500).send("An error occurred");
    }
};

export const deleteShop = async (req, res) => {
    try {
        const { shopId } = req.params;
        await Shop.findByIdAndDelete(shopId);
        await Item.deleteMany({ shopId });
        await Order.deleteMany({ shopId });
        return res.json({ message: "Shop deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).send("An error occurred");
    }
};