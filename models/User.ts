// models/User.ts

import { Schema, model, models } from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
)

// Avoid model overwrite error in Next.js (hot reload)
const User = models.User || model('User', userSchema)

export default User
