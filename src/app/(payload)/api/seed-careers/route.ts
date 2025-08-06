import { NextRequest } from 'next/server'

export async function GET(_request: NextRequest): Promise<Response> {
  try {
    // Career seeding temporarily disabled due to complex Lexical structure
    // You can manually add career positions through the Payload CMS admin panel at /admin

    return Response.json({
      success: false,
      message:
        'Career seeding is currently disabled. Please add career positions manually through the admin panel at /admin.',
    })
  } catch (error: unknown) {
    console.error('Career seeding failed:', error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Career seeding failed',
      },
      { status: 500 },
    )
  }
}
