import NextAuth from "next-auth";

import CredentialsProvider
    from "next-auth/providers/credentials";

import connectDB from "../../../../lib/mongodb";

import User from "../../../../models/User";

import bcrypt from "bcryptjs";

const handler = NextAuth({

    providers: [

        CredentialsProvider({

            name: "credentials",

            credentials: {
                email: {},
                password: {},
            },

            async authorize(
                credentials
            ) {

                await connectDB();

                const user =
                    await User.findOne({
                        email:
                            credentials.email,
                    });

                if (!user) {
                    throw new Error(
                        "User not found"
                    );
                }

                const isPasswordCorrect =
                    await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                if (!isPasswordCorrect) {
                    throw new Error(
                        "Invalid password"
                    );
                }

                return {
                    id:
                        user._id.toString(),

                    name:
                        user.name,

                    email:
                        user.email,

                    role:
                        user.role,
                };
            },
        }),
    ],

    callbacks: {

        async jwt({
            token,
            user,
        }) {

            if (user) {
                token.role =
                    user.role;
            }

            return token;
        },

        async session({
            session,
            token,
        }) {

            session.user.role =
                token.role;

            return session;
        },
    },

    pages: {
        signIn: "/login",
    },

    secret:
        process.env.NEXTAUTH_SECRET,
});

export {
    handler as GET,
    handler as POST,
};