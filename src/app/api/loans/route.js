import connectDB from "../../../lib/mongodb";

import Loan from "../../../models/Loan";
import { createAuditLog } from "../../../utils/createAuditLog";
import { calculateLoan } from "../../../utils/calculateEmi";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const loans = await Loan.find()
      .populate("clientId")
      .populate("branchId");

    return NextResponse.json({
      success: true,
      loans,
    });

  } catch (error) {

    console.log(error);

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

    const amount = Number(body.amount);

    const interestRate = Number(
      body.interestRate
    );

    const durationMonths = Number(
      body.durationMonths
    );

    const calculations = calculateLoan(
      amount,
      interestRate,
      durationMonths
    );

    const loan = await Loan.create({
      clientId: body.clientId,

      branchId: body.branchId,

      amount,

      interestRate,

      durationMonths,

      emiAmount:
        calculations.emiAmount,

      totalRepayment:
        calculations.totalRepayment,

      status: "ACTIVE",
    });
    
    await createAuditLog({
      action: "CREATE_LOAN",

      module: "LOANS",

      user: "ADMIN",

      details: `Loan created for amount ₹${amount}`,
    });

    return NextResponse.json({
      success: true,
      loan,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

