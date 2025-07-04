import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // User name
    name: {
      type: String,
      required: true,
    },
    // User email
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // User password
    password: {
      type: String,
      required: true,
    },
    // Profile Image Url
    profileImageUrl: {
      type: String,
      default: null,
    },
    // User role
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
