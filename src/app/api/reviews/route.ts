// src/app/api/reviews/route.ts
import { connectDB } from '@/lib/db'
import Review from '@/models/Review'

import '@/lib/mongoose-models' // This line replaces the direct User and Product imports
import { NextResponse } from 'next/server'

// GET: Fetch all reviews (public)
export async function GET() {
  try {
    await connectDB()

    const reviews = await Review.find()
      .populate('user', 'name email') // populate user name and email
      .populate('product', 'name image') // populate product name and image

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error in GET /api/reviews:', error)
    return NextResponse.json(
      { message: 'Error fetching reviews' },
      { status: 500 }
    )
  }
}

// POST: Add a new review
export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()

    const newReview = await Review.create(body)

    return NextResponse.json(newReview, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error creating review' },
      { status: 500 }
    )
  }
}
