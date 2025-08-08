import Image from 'next/image'
import { ProductType } from '@/types/product'

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div className='border rounded-md shadow-md p-4'>
      <div className='relative w-full h-64'>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className='object-cover rounded-md'
        />
      </div>
      <h2 className='mt-4 text-lg font-semibold'>{product.name}</h2>
      <p className='text-sm text-gray-500'>{product.brand}</p>
      <p className='text-md font-bold'>${product.price}</p>
    </div>
  )
}

export default ProductCard
