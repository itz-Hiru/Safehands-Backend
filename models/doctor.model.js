import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    pricePerSession: { type: Number, required: true },
    durationInMinutes: { type: Number, required: true },
    images: [{ type: String }],
  },
  {
    _id: false,
  }
);

const DoctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    services: [ServiceSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", DoctorSchema);
