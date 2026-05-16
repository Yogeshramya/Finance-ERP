import { NextResponse } from "next/server";

import { sendSMS }
    from "../../../utils/sendSMS";

export async function POST(req) {

    try {

        const body =
            await req.json();

        console.log(
            "SMS REQUEST:",
            body
        );

        const result =
            await sendSMS({
                number: body.number,
                message: body.message,
            });

        return NextResponse.json({
            success: true,
            result,
        });

    } catch (error) {

        console.log(
            "SMS API ERROR:",
            error
        );

        return NextResponse.json({
            success: false,
            error: error.message,
        });
    }
}