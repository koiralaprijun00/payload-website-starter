import React from 'react'
import { notFound } from 'next/navigation'
import Hero from '@/app/(frontend)/themes/_components/Hero'
import IntroSection from '@/app/(frontend)/themes/_components/IntroSection'
import MainContent from '@/app/(frontend)/themes/_components/MainContent'
import ContentImage from '@/app/(frontend)/themes/_components/ContentImage'
import ProjectsSection from '@/app/(frontend)/themes/_components/ProjectsSection'
import { ThemePage } from '@/payload-types'

async function getSpeciesPageData(): Promise<ThemePage | null> {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/theme-pages?where[slug][equals]=species&depth=2`,
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
      {typeof pageData.hero.image === 'object' && pageData.hero.image && (
        <Hero title={pageData.title} image={pageData.hero.image} />
      )}
      <IntroSection introSection={pageData.introSection} />
      <MainContent mainContent={pageData.mainContent} />
      {typeof pageData.contentImage === 'object' && pageData.contentImage && (
        <ContentImage image={pageData.contentImage} />
      )}
      <ProjectsSection themeId={pageData.id} />
    </div>
  )
}
