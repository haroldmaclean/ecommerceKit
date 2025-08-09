// src/app/api/protected/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const decoded = verifyToken(request)

  if (decoded instanceof NextResponse) {
    return decoded // return error if token is invalid
  }

  // Token is valid — decoded contains user info
  return NextResponse.json({
    message: 'Protected route accessed successfully',
    user: decoded,
  })
}
