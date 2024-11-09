import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
      default:
        "https://img.freepik.com/premium-photo/web-developer-digital-avatar-generative-ai_934475-9048.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
