import { connectDB } from '@/lib/db'
import User from '@/models/User'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { generateToken } from '@/lib/jwt'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { email, password } = await req.json()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT
    const token = generateToken({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user.toObject()

    return NextResponse.json({ user: userWithoutPassword, token })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error during login' }, { status: 500 })
  }
}
