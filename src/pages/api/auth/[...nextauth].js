import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/backend/models/userModel";
import bcrypt from "bcryptjs";
import dbConnect from "@/backend/config/dbconfig";

export default async function auth(req, res) {
  //   if (req.query.nextauth.includes("callback") && req.method === "POST") {
  //     console.log(
  //       "Handling callback request from my Identity Provider",
  //       req.body
  //     );
  //   }

  // const someCookie = req.cookies["next-auth.session-token"];

  return await NextAuth(req, res, {
    session: {
      strategy: "jwt",
    },
    providers: [
      CredentialsProvider({
        async authorize(credentials, req) {
          dbConnect();

          const { email, password } = credentials;

          if (!email || !password) {
            throw new Error("Please input your email or Password");
          }

          const user = await User.findOne({ email }).select("+password");

          if (!user) {
            throw new Error("invalid email or password");
          }

          const isPasswordMatch = await bcrypt.compare(password, user.password);

          if (!isPasswordMatch) {
            throw new Error("invalid email or password");
          }

          return user;
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        user && (token.user = user);

        return token;
      },

      session: async ({ session, token }) => {
        session.user = token.user;
        // session.someCookie = someCookie;

        return session;
      },
    },
    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}
