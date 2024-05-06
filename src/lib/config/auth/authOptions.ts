import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongo-adapter";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { Adapter } from "next-auth/adapters";

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const formEmail = credentials?.email as string;
        const plainPassword = credentials?.password as string;

        await dbConnect(); // Connect to the database
        const isUserExist = await User.findOne({ email: formEmail });

        if (!isUserExist) {
          return null; // User not found
        }

        const isValidPassword = bcrypt.compareSync(
          plainPassword,
          isUserExist.password
        );

        if (!isValidPassword) {
          return null; // Invalid password
        }

        // Return the authorized user information
        return {
          id: isUserExist._id,
          name: isUserExist.name,
          email: isUserExist.email,
          role: isUserExist.role,
          is_admin: isUserExist.is_admin,
        };
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
};

export default authOptions;
