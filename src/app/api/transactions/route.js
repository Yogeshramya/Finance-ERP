import connectDB from "../../../lib/mongodb";

import Transaction from "../../../models/Transaction";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const transactions =
      await Transaction.find()
        .populate("clientId")
        .populate("loanId")
        .populate("branchId");

    return NextResponse.json({
      success: true,
      transactions,
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

    const transaction =
      await Transaction.create({
        ...body,

        amount: Number(
          body.amount
        ),
      });

    return NextResponse.json({
      success: true,
      transaction,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}