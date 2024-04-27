import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    message: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
export default Contact;