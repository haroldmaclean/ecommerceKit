import { NextRequest, NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'

// Define the expected shape of your handler function
type Handler = (req: NextRequest) => Promise<NextResponse>

export function isAdminMiddleware(handler: Handler): Handler {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      const authHeader = req.headers.get('authorization')
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { message: 'Unauthorized: No token' },
          { status: 401 }
        )
      }

      const token = authHeader.split(' ')[1]
      const decoded = verify(token, process.env.JWT_SECRET!) as {
        id: string
        email: string
        isAdmin: boolean
      }

      if (!decoded.isAdmin) {
        return NextResponse.json(
          { message: 'Forbidden: Admins only' },
          { status: 403 }
        )
      }

      return handler(req)
    } catch (err) {
      console.error(err)
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      )
    }
  }
}
