import bcrypt from 'bcryptjs'
import NextAuth, { getServerSession } from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/lib/mongo-adapter'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import { Adapter } from 'next-auth/adapters'

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const formEmail = credentials?.email as string
        const plainPassword = credentials?.password as string
        // connect to the database
        await dbConnect()
        // find the email address
        const isUserExist = await User.findOne({ email: formEmail })

        if (!isUserExist) {
          return null
        }

        // validate the password
        const isValidPassword = bcrypt.compareSync(
          plainPassword,
          isUserExist?.password
        )

        if (!isValidPassword) {
          return null
        }
        // return null
        return {
          id: isUserExist?._id,
          name: isUserExist?.name,
          email: isUserExist?.email,
          role: isUserExist?.role,
          // is_admin: isUserExist?.is_admin,
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
}

// export async function isAdmin() {
//   const session = await getServerSession()
//   const userEmail = session?.user?.email
//   if (!userEmail) {
//     return false
//   }
//   const userInfo = await User.findOne({ email: userEmail })
//   if (!userInfo) {
//     return false
//   }
//   return userInfo?.is_admin
// }

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

// GoogleProvider({
//   clientId: process.env.GOOGLE_CLIENT_ID as string,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
// }),
