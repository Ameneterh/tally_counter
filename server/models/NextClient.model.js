import mongoose from "mongoose";

const nextClientSchema = new mongoose.Schema(
  {
    tally: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    isDispensed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const NextClient = mongoose.model("NextClient", nextClientSchema);

export default NextClient;
