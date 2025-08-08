// app/(site)/product/[id]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'

async function getProduct(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`
  )

  if (!res.ok) return null

  return res.json()
}

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProduct(params.id)

  if (!product) return notFound()

  return (
    <div className='p-4 max-w-4xl mx-auto'>
      <div className='flex flex-col md:flex-row gap-6'>
        <div className='relative w-full md:w-1/2 h-[400px]'>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className='object-contain rounded-lg shadow-md'
          />
        </div>
        <div className='flex-1 space-y-4'>
          <h2 className='text-2xl font-bold'>{product.name}</h2>
          <p className='text-gray-500'>{product.description}</p>
          <p className='text-xl font-semibold'>${product.price}</p>
          <p>
            {product.countInStock > 0 ? (
              <span className='text-green-600'>In Stock</span>
            ) : (
              <span className='text-red-600'>Out of Stock</span>
            )}
          </p>
          <button
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
            disabled={product.countInStock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
