import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    item: {
        _id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        subcategory: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        images: {
            type: [String],
            required: true
        },
        shopId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const CartItem = mongoose.models.CartItem || mongoose.model("CartItem", cartItemSchema)
export default CartItem;