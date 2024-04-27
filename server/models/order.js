import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    item: {
      type: Object,
      default: {}
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    paymentMethod: {
      type: String,
      default: "cash",
    },
    orderStatus: {
      type: String,
      default: "pending",
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    //@ts-ignore
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    quantity: {
      type: Number,
      required: true
    },
    shopId: {
      type: mongoose.Types.ObjectId,
      required: true
    }
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order; 