// app/api/products/route.ts
import { connectDB } from '@/lib/db'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'

// Utility to generate slug from name
const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')

// ✅ POST: Create a new product
export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()

    const slug = generateSlug(body.name)

    const newProduct = await Product.create({
      ...body,
      slug,
    })

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error creating product' },
      { status: 500 }
    )
  }
}

// ✅ GET: Fetch all products
export async function GET() {
  try {
    await connectDB()
    const products = await Product.find()
    return NextResponse.json(products)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error fetching products' },
      { status: 500 }
    )
  }
}
