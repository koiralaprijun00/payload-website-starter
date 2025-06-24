import React from 'react'
import { notFound } from 'next/navigation'
import Hero from '@/app/(frontend)/themes/_components/Hero'
import { ThemePage } from '@/payload-types'

async function getResearchPageData(): Promise<ThemePage | null> {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/theme-pages?where[slug][equals]=research`,
    { cache: 'no-store' },
  )

  if (!req.ok) {
    return null
  }

  const { docs } = await req.json()

  if (docs.length === 0) {
    return null
  }

  return docs[0]
}

export default async function ResearchPage() {
  const pageData = await getResearchPageData()

  if (!pageData) {
    return notFound()
  }

  return (
    <div>
      {typeof pageData.hero.image === 'object' && pageData.hero.image && (
        <Hero title={pageData.title} image={pageData.hero.image} />
      )}
      {/* More components will be added here */}
    </div>
  )
}
