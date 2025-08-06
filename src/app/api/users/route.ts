// src/app/api/users/route.ts

import { connectDB } from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

// GET: Fetch all users (just for setup/testing – no auth yet)
export async function GET() {
  try {
    await connectDB()
    const users = await User.find().select('-password') // exclude password
    return NextResponse.json(users)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error fetching users' },
      { status: 500 }
    )
  }
}

// POST: Register a new user (no validation/auth yet)

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(body.password, 10)

    const newUser = await User.create({
      ...body,
      password: hashedPassword,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userWithoutPassword = (({ password: _, ...rest }) => rest)(
      newUser.toObject()
    )

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    )
  }
}
