import Item from "../models/item.js";

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        return res.json({ items });
    } catch (error) {
        console.log(error);
        return res.status(500).send("An error occurred");
    }
};

export const deleteItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        await Item.findByIdAndDelete(itemId);
        return res.json({ message: "Item deleted" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("An error occurred");
    }
}