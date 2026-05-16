import connectDB from "../../../lib/mongodb";

import User from "../../../models/User";

import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

export async function POST(req) {

    try {

        await connectDB();

        const body = await req.json();

        const existingUser =
            await User.findOne({
                email: body.email,
            });

        if (existingUser) {

            return NextResponse.json({
                success: false,
                error:
                    "User already exists",
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                body.password,
                10
            );

        const user =
            await User.create({
                name: body.name,

                email: body.email,

                password:
                    hashedPassword,

                role:
                    body.role ||
                    "STAFF",
            });

        return NextResponse.json({
            success: true,
            user,
        });

    } catch (error) {

        return NextResponse.json({
            success: false,
            error: error.message,
        });
    }
}