import React from 'react'
import { notFound } from 'next/navigation'
import Hero from '@/app/(frontend)/themes/_components/Hero'
import { ThemePage } from '@/payload-types'

async function getSpeciesPageData(): Promise<ThemePage | null> {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/theme-pages?where[slug][equals]=species`,
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

export default async function SpeciesPage() {
  const pageData = await getSpeciesPageData()

  if (!pageData) {
    return notFound()
  }

  return (
    <div>
      <Hero title={pageData.hero.title} subtitle={pageData.hero.subtitle} />
      {/* More components will be added here */}
    </div>
  )
}
