import React from 'react'
import type { Metadata } from 'next'
import { getCareers } from '@/utilities/getCareers'
import CareersClient from './CareersClient'

// Convert to ISR with 10-minute revalidation (careers don't change frequently)
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Ujalyo Bardiya',
  description:
    'Join our team and make a difference in wildlife conservation. Explore current job openings and career opportunities.',
}

export default async function CareersPage() {
  const careers = await getCareers()

  return <CareersClient careers={careers} />
}
