import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import ConservationSectionClient from '@/components/ConservationSectionClient'
import HomePageProjectsClient from '@/components/HomePageProjectsClient'
import HomePageImpactClient from '@/components/HomePageImpactClient'
import type { ImpactBlock } from '@/components/HomePageImpact'
import type { ProjectRelationship } from '@/components/HomePageProjects'
import type { ThemePage, Page, Notice } from '@/payload-types'

// Optimized function to get theme pages with better caching
const getThemePages = cache(async (): Promise<ThemePage[]> => {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'theme-pages',
      depth: 1, // Reduced from 2 to 1 for better performance
      limit: 10,
      pagination: false,
      overrideAccess: false,
    })
    return result.docs || []
  } catch (error) {
    console.error('Error fetching theme pages:', error)
    return []
  }
})

// Optimized function to get notices for hero components (server-side)
const getNotices = cache(async (): Promise<Notice[]> => {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'notices',
      depth: 1,
      limit: 4,
      pagination: false,
      overrideAccess: false,
      sort: '-publishedAt',
      select: {
        id: true,
        category: true,
        title: true,
        summary: true,
        image: true,
        slug: true,
        publishedAt: true,
      },
    })
    return result.docs || []
  } catch (error) {
    console.error('Error fetching notices:', error)
    return []
  }
})

// Combined data fetching function for homepage with optimized queries
const getPageData = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  // Fetch page data, theme pages, and notices concurrently with optimized field selection
  const [pageResult, themePages, notices] = await Promise.all([
    payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      depth: 1, // Reduced depth
      where: {
        slug: {
          equals: slug,
        },
      },
      select: {
        title: true,
        slug: true,
        hero: true,
        layout: true,
        conservationSection: true,
        homePageProjects: true,
        homePageImpact: true,
        meta: {
          title: true,
          description: true,
          image: true,
        },
      },
    }),
    slug === 'home' ? getThemePages() : Promise.resolve([]),
    // Fetch notices for hero components that need them
    slug === 'home' ? getNotices() : Promise.resolve([]),
  ])

  const page = pageResult.docs?.[0] || null

  return {
    page,
    themePages,
    notices,
  }
})

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  // Use optimized data fetching
  const { page, themePages, notices } = await getPageData(slug)

  let finalPage: RequiredDataFromCollectionSlug<'pages'> | null = page

  // Remove this code once your website is seeded
  if (!finalPage && slug === 'home') {
    finalPage = homeStatic
  }

  if (!finalPage) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = finalPage

  // Add notices to hero props if the hero type needs them
  const heroWithNotices = hero && hero.type === 'homePageNoticeV2' ? { ...hero, notices } : hero

  return (
    <article>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...heroWithNotices} />
      {finalPage.conservationSection && (
        <ConservationSectionClient
          sectionHeading={finalPage.conservationSection.sectionHeading || ''}
          sectionDescription={finalPage.conservationSection.sectionDescription || ''}
          buttonText={finalPage.conservationSection.buttonText || ''}
          buttonLink={finalPage.conservationSection.buttonLink || ''}
          tabs={(finalPage.conservationSection.tabs || []).map((tab) => {
            // Find the theme page by link (e.g. '/ecosystem')
            const themeSlug = tab.link.replace('/', '')
            const themePage = themePages.find((tp) => tp.slug === themeSlug)
            let image: string | { url: string } | undefined = ''
            if (themePage?.hero?.image) {
              if (typeof themePage.hero.image === 'string') {
                image = themePage.hero.image
              } else if (typeof themePage.hero.image === 'object' && themePage.hero.image.url) {
                image = { url: themePage.hero.image.url }
              }
            }
            return {
              label: tab.label || '',
              title: tab.title || '',
              text: tab.text || '',
              link: tab.link || '',
              image,
            }
          })}
        />
      )}

      {finalPage.homePageProjects && (
        <HomePageProjectsClient
          sectionLabel={finalPage.homePageProjects.sectionLabel || ''}
          heading={finalPage.homePageProjects.heading || ''}
          subheading={finalPage.homePageProjects.subheading || ''}
          blocks={(finalPage.homePageProjects.blocks || []).map((block) => {
            let link: string | ProjectRelationship | null = null
            if (typeof block.link === 'string') {
              link = block.link
            } else if (
              block.link &&
              typeof block.link === 'object' &&
              typeof block.link.slug === 'string' &&
              block.link.slug
            ) {
              link = {
                ...block.link,
                slug: block.link.slug,
              } as ProjectRelationship
            }
            return {
              title: block.title || '',
              description: block.description || '',
              value: block.value || '',
              image:
                block.image && typeof block.image === 'object' && block.image.url
                  ? { url: block.image.url || '' }
                  : '',
              bgColor: block.bgColor || '',
              link,
            }
          })}
        />
      )}
      {finalPage.homePageImpact && (
        <HomePageImpactClient
          sectionLabel={finalPage.homePageImpact.sectionLabel || ''}
          heading={finalPage.homePageImpact.heading || ''}
          description={finalPage.homePageImpact.description || ''}
          buttonText={finalPage.homePageImpact.buttonText || ''}
          buttonLink={finalPage.homePageImpact.buttonLink || ''}
          blocks={(finalPage.homePageImpact.blocks || []).map((block): ImpactBlock => {
            let icon: string | { url: string } = ''
            if (block.icon && typeof block.icon === 'object' && block.icon !== null) {
              if ('url' in block.icon && typeof block.icon.url === 'string') {
                icon = { url: block.icon.url }
              } else if ('filename' in block.icon && typeof block.icon.filename === 'string') {
                icon = { url: `/media/${block.icon.filename}` }
              } else {
                icon = ''
              }
            } else if (typeof block.icon === 'string') {
              icon = block.icon
            }
            return {
              icon,
              value: block.value || '',
              label: block.label || '',
              bgColor: block.bgColor || '',
            }
          })}
        />
      )}
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const { page } = await getPageData(slug)

  return generateMeta({ doc: page })
}
