import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    aadhaar: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    occupation: {
      type: String,
      default: "",
    },

    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },

    groupName: {
      type: String,
      default: "",
    },

    centerName: {
      type: String,
      default: "",
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

export default mongoose.models.Client ||
  mongoose.model("Client", ClientSchema);