export interface ProductType {
  _id: string
  name: string
  price: number
  description: string
  image: string
  category?: string
  brand?: string
  countInStock?: number
  rating?: number
  numReviews?: number
  createdAt?: string
  updatedAt?: string
}
