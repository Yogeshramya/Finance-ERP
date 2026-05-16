import connectDB from "../lib/mongodb";

import AuditLog from "../models/AuditLog";

export async function createAuditLog({
  action,
  module,
  user,
  details,
}) {

  try {

    await connectDB();

    await AuditLog.create({
      action,
      module,
      user,
      details,
    });

  } catch (error) {

    console.log(
      "Audit Error:",
      error
    );
  }
}