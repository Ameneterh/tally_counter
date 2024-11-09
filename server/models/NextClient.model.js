import mongoose from "mongoose";

const nextClientSchema = new mongoose.Schema(
  {
    tally: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const NextClient = mongoose.model("NextClient", nextClientSchema);

export default NextClient;
