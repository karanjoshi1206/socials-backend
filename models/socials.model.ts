import mongoose from "mongoose";

const SocialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    socialLogo: {
      type: String,
      required: true
    },
    socialBaseUrl: {
      type: String,
      required: false
    }
  },
  { collection: "socials" }
);

const Socials = mongoose.model("socialz", SocialSchema);

export default Socials;
