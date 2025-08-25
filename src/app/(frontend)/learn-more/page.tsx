import React from 'react'
import { Metadata } from 'next'
import { getCachedGlobal } from '@/utilities/getGlobals'
import RichText from '@/components/RichText'
import type { LearnMore as LearnMoreType } from '@/payload-types'
import type { Page } from '@/payload-types'
import ImpactSection, { type RawImpactBlock } from './_components/ImpactSection'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

export default async function LearnMorePage() {
  const learnMoreData = (await getCachedGlobal('learn-more', 1)()) as LearnMoreType

  // Get home page data to access impact blocks
  const payload = await getPayload({ config: configPromise })
  const homePageData = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    depth: 2,
    limit: 1,
  })
  const homePage = homePageData.docs[0] as Page | undefined

  return (
    <div className="min-h-screen">
      {/* Impact Section */}
      {homePage?.homePageImpact && (
        <ImpactSection
          sectionLabel={homePage.homePageImpact.sectionLabel || ''}
          heading={homePage.homePageImpact.heading || ''}
          description={homePage.homePageImpact.description || ''}
          blocks={
            (homePage.homePageImpact.blocks || []).map((block): RawImpactBlock => {
              let icon: string | { url: string } | undefined
              const rawIcon = block.icon as unknown
              if (rawIcon && typeof rawIcon === 'object') {
                const maybe = rawIcon as { url?: string | null; filename?: string | null }
                if (typeof maybe.url === 'string') {
                  icon = { url: maybe.url }
                } else if (typeof maybe.filename === 'string') {
                  icon = { url: `/media/${maybe.filename}` }
                }
              } else if (typeof rawIcon === 'string') {
                icon = rawIcon
              }
              return {
                icon,
                value: block.value || '',
                label: block.label || '',
                bgColor: block.bgColor || undefined,
              }
            }) as RawImpactBlock[]
          }
        />
      )}

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {learnMoreData.content ? (
            <div className="prose prose-lg max-w-none">
              <RichText data={learnMoreData.content} />
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Content Coming Soon</h3>
                <p className="text-gray-600">
                  Content will appear here once it&apos;s added from the admin panel.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Ujalyo Bardiya',
    description: 'Learn more about our work, impact, and mission.',
  }
}
