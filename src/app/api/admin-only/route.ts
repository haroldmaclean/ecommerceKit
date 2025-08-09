import { isAdminMiddleware } from 'middleware/isAdmin'
import { NextResponse, NextRequest } from 'next/server'

export const GET = isAdminMiddleware(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_req: NextRequest): Promise<NextResponse> => {
    return NextResponse.json({
      message: 'Admin-only route accessed successfully',
    })
  }
)
