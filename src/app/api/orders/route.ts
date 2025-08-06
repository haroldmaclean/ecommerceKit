// src/app/api/orders/route.ts
import { connectDB } from '@/lib/db'
import Order from '@/models/Order'
import { NextResponse } from 'next/server'

// GET: Fetch all orders (Admin only — auth not added yet)
export async function GET() {
  try {
    await connectDB()
    const orders = await Order.find().populate('user').populate('products')
    return NextResponse.json(orders)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error fetching orders' },
      { status: 500 }
    )
  }
}

// POST: Create a new order
export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
    const newOrder = await Order.create(body)
    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error creating order' },
      { status: 500 }
    )
  }
}
