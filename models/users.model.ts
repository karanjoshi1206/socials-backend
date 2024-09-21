import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    userName: {
      type: String,
      required: false,
      unique: true
    },
    // Array to store user's social media handles
    socialHandles: [
      {
        platform: { type: mongoose.Schema.Types.ObjectId, ref: "Social" },
        handle: { type: String, required: true }
      }
    ]
  },
  { collection: "users" }
);

export default mongoose.model("User", UserSchema);
