import { connectDB } from '@/lib/db'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'

// ✅ GET /api/products/:id → Get product by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const product = await Product.findById(params.id)

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error fetching product' }, { status: 500 })
  }
}

// ✅ PUT /api/products/:id → Update product
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const data = await request.json()

    const updatedProduct = await Product.findByIdAndUpdate(params.id, data, {
      new: true, // return updated document
      runValidators: true,
    })

    if (!updatedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error updating product' }, { status: 500 })
  }
}

// ✅ DELETE /api/products/:id → Delete product
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const deletedProduct = await Product.findByIdAndDelete(params.id)

    if (!deletedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error deleting product' }, { status: 500 })
  }
}
