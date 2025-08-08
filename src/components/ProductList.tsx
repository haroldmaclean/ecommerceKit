'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { ProductType } from '@/types/product'

const ProductList = () => {
  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <section className='py-8 px-4'>
      <h2 className='text-2xl font-bold mb-4'>🛍️ All Products</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ProductList
