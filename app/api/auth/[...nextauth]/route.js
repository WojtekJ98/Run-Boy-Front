import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import mongooseConnect from "@/app/lib/mongoose";
import { User } from "@/app/models/User";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await mongooseConnect();
          const user = await User.findOne({ email: credentials.email });
          console.log(user);

          if (!user) {
            console.error("User not found");
            return null;
          }
          const isValidPassword = bcrypt.compareSync(
            credentials.password,
            user.password
          );
          if (!isValidPassword) {
            console.error("Invalid password");
            return null;
          }
          return {
            id: user._id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id || user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
