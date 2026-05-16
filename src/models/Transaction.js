import mongoose from "mongoose";

const TransactionSchema =
  new mongoose.Schema(
    {
      loanId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Loan",
      },

      clientId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Client",
      },

      branchId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true,
      },

      type: {
        type: String,
        enum: [
          "COLLECTION",
          "DISBURSEMENT",
          "EXPENSE",
        ],
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },

      description: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "PENDING",
          "APPROVED",
        ],
        default: "PENDING",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models
  .Transaction ||
  mongoose.model(
    "Transaction",
    TransactionSchema
  );