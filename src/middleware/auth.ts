import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../lib/jwt'

export async function authenticateUser(req: NextRequest) {
  const authHeader = req.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = verifyToken(token)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    req.user = decoded
    return null // no error
  } catch (error) {
    console.error(error) // 👈 Add this for debugging
    return NextResponse.json(
      { message: 'Invalid or expired token' },
      { status: 401 }
    )
  }
}
