import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    interestRate: {
      type: Number,
      required: true,
    },

    durationMonths: {
      type: Number,
      required: true,
    },

    emiAmount: {
      type: Number,
      required: true,
    },

    totalRepayment: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "ACTIVE",
        "COMPLETED",
      ],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Loan ||
  mongoose.model("Loan", LoanSchema);