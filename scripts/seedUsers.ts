// scripts/seedUsers.ts
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import { users } from '../data/users'
import User from '../src/models/User'

dotenv.config({ path: '.env.local' }) // Load env from .env.local

const seedUsers = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('⚠️ MONGODB_URI is not defined in .env.local')
    }

    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB Atlas')

    await User.deleteMany()
    console.log('🗑️ Cleared old users')

    const hashedUsers = users.map((user) => ({
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    }))

    await User.insertMany(hashedUsers)
    console.log('✅ Seeded users successfully')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding users:', error)
    process.exit(1)
  }
}

seedUsers()
