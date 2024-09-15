// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true
//     },
//     userName: {
//       type: String,
//       required: false
//     }
//   },
//   { collection: "users" }
// );

// export default mongoose.model("users", UserSchema);

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
      unique: true // Ensures no two users have the same email
    },
    userName: {
      type: String,
      required: false,
      unique: true // Ensures no two users have the same username
    },
    // Array to store user's social media handles
    socialHandles: [
      {
        platform: { type: mongoose.Schema.Types.ObjectId, ref: "Social" }, // Reference to Social Model
        handle: { type: String, required: true } // User's specific handle for the platform
      }
    ]
  },
  { collection: "users" }
);

export default mongoose.model("User", UserSchema);
