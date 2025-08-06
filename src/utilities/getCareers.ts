import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Career } from '@/payload-types'

export async function getCareers() {
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
    description: career.description,
    responsibilities: career.responsibilities,
    requirements: career.requirements,
    applicationEmail: career.applicationEmail,
    applicationInstructions: career.applicationInstructions,
    createdAt: career.createdAt,
    updatedAt: career.updatedAt,
  }))
}
