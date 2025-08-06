// src/lib/mongoose-models.ts
import mongoose from 'mongoose'

// Import all models to ensure they are registered with Mongoose
import Review from '@/models/Review'
import User from '@/models/User'
import Product from '@/models/Product'
import Order from '@/models/Order' // Added the Order model import

// Create a function to check if models are registered
export function areModelsRegistered() {
  return (
    mongoose.modelNames().includes('Review') &&
    mongoose.modelNames().includes('User') &&
    mongoose.modelNames().includes('Product') &&
    mongoose.modelNames().includes('Order') // Added Order to the check
  )
}

// Export all models to ensure they are registered with Mongoose
// The act of importing these files here is enough to trigger their registration.
export { Review, User, Product, Order } // Added Order to the export
