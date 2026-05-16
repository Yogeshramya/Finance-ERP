import connectDB from "../../../../lib/mongodb";

import Transaction from "../../../../models/Transaction";

import { NextResponse } from "next/server";

export async function PATCH(
  req,
  context
) {
  try {
    await connectDB();

    console.log("PATCH API HIT");

    const id = context.params.id;

    console.log("Transaction ID:", id);

    const body = await req.json();

    console.log("Request Body:", body);

    const transaction =
      await Transaction.findByIdAndUpdate(
        id,
        {
          status: body.status,
        },
        {
          new: true,
        }
      );

    console.log(
      "Updated Transaction:",
      transaction
    );

    return NextResponse.json({
      success: true,
      transaction,
    });

  } catch (error) {

    console.log("PATCH ERROR:", error);

    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}