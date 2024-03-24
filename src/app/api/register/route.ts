import dbConnect from '@/lib/db'
import User from '@/models/User'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const reqBody = await req.json()
    const { name, email, password } = reqBody

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Mission fields' }, { status: 400 })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exist' }, { status: 400 })
    }

    //generate salt
    const salt = bcrypt.genSaltSync(10)
    //hashed password
    const hashedPassword = bcrypt.hashSync(password, salt)
    await new User({ name, email, password: hashedPassword }).save()

    return NextResponse.json({ message: 'User created successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
