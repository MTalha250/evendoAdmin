import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        subcategory: { type: String, required: true },
        city: { type: String, required: true },
        images: { type: [String], required: true },
        shopId: { type: mongoose.Types.ObjectId, required: true },
        content: { type: String, required: true },
        price: { type: Number, required: true },
        amountOfOrders: { type: Number, required: true, default: 0 },
        reviews: [
            {
                user_id: { type: String, required: true },
                review: { type: String, required: true },
                rating: { type: Number, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);
export default Item;