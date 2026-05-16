import connectDB from "../../../lib/mongodb";

import AuditLog from "../../../models/AuditLog";

import { NextResponse } from "next/server";

export async function GET() {

  try {

    await connectDB();

    const logs =
      await AuditLog.find().sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      logs,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}