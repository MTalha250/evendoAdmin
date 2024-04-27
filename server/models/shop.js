import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    logo: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    cnicFront: {
      type: String,
      required: true,
    },
    cnicBack: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.models.Shop || mongoose.model("Shop", shopSchema);
export default Shop;
