import bcrypt from 'bcryptjs'

export const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin123', 10), // hashed password
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('john123', 10),
    isAdmin: false,
  },
]
