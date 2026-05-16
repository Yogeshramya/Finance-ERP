import connectDB from "../../../lib/mongodb";

import Client from "../../../models/Client";

import Loan from "../../../models/Loan";

import Transaction from "../../../models/Transaction";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const totalClients =
      await Client.countDocuments();

    const loans =
      await Loan.find();

    const transactions =
      await Transaction.find();

    const pendingApprovals =
      await Transaction.countDocuments({
        status: "PENDING",
      });

    const totalLoans =
      loans.reduce(
        (sum, loan) =>
          sum + loan.amount,
        0
      );

    const totalCollections =
      transactions
        .filter(
          (transaction) =>
            transaction.type ===
            "COLLECTION"
        )
        .reduce(
          (sum, transaction) =>
            sum +
            transaction.amount,
          0
        );

    return NextResponse.json({
      success: true,

      stats: {
        totalClients,
        totalLoans,
        totalCollections,
        pendingApprovals,
      },
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}