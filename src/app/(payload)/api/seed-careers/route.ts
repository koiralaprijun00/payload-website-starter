import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { seedCareers } from '@/endpoints/seed/careers'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const payload = await getPayload({ config: configPromise })

    // Only seed careers without clearing other data
    await seedCareers(payload)

    return Response.json({
      success: true,
      message: 'Careers seeded successfully! Your existing data was preserved.',
    })
  } catch (error: any) {
    console.error('Career seeding failed:', error)
    return Response.json(
      {
        success: false,
        error: error.message || 'Career seeding failed',
      },
      { status: 500 },
    )
  }
}
