import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import type { Career } from '@/payload-types'

async function fetchCareers() {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'careers',
    depth: 1,
    limit: 100,
    sort: '-createdAt',
  })

  return res.docs.map((career: Career) => ({
    id: career.id,
    title: career.title,
    status: career.status,
    deadline: career.deadline,
    location: career.location,
    type: career.type,
    experience: career.experience,
    summary: career.summary,
    applicationEmail: career.applicationEmail,
    applicationInstructions: career.applicationInstructions,
    createdAt: career.createdAt,
    updatedAt: career.updatedAt,
  }))
}

/**
 * Returns cached careers with 10-minute revalidation
 * Careers don't change frequently, so longer cache is appropriate
 */
export const getCachedCareers = () =>
  unstable_cache(async () => fetchCareers(), ['careers'], {
    tags: ['careers'],
    revalidate: 600, // 10 minutes
  })

// Keep the original function for backward compatibility
export const getCareers = getCachedCareers()
