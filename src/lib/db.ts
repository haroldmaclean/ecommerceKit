// lib/db.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable in .env.local'
  )
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// Attach the cache to the global object to avoid multiple connections during hot reload in dev
const globalWithMongoose = global as typeof globalThis & {
  mongoose: MongooseCache
}

const cached: MongooseCache = globalWithMongoose.mongoose || {
  conn: null,
  promise: null,
}

export async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: 'ecommerce',
      })
      .then((mongoose) => mongoose)
  }

  cached.conn = await cached.promise
  globalWithMongoose.mongoose = cached // store it globally for reuse

  return cached.conn
}
