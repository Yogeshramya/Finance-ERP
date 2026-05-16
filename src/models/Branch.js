import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
    },

    location: {
      type: String,
      required: true,
    },

    managerName: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    cashBalance: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Branch ||
  mongoose.model("Branch", BranchSchema);