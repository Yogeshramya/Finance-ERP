import connectDB from "../../../lib/mongodb";

import Branch from "../../../models/Branch.js";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const branches = await Branch.find();

    return NextResponse.json({
      success: true,
      branches,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const branch = await Branch.create(body);

    return NextResponse.json({
      success: true,
      branch,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}