import mongoose from "mongoose";

const AuditLogSchema =
  new mongoose.Schema(
    {
      action: {
        type: String,
        required: true,
      },

      module: {
        type: String,
        required: true,
      },

      user: {
        type: String,
        default: "SYSTEM",
      },

      details: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models
  .AuditLog ||
  mongoose.model(
    "AuditLog",
    AuditLogSchema
  );
  