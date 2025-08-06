// src/components/layout/Navbar.tsx
'use client'

import { ThemeToggle } from '@/components/ui/ThemeToggle'

export default function Navbar() {
  return (
    <nav className='flex justify-between items-center p-4 border-b shadow-sm'>
      <h1 className='text-xl font-bold'>CommerceKit</h1>
      <ThemeToggle />
    </nav>
  )
}
