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
import { ThemePage } from '@/payload-types'
import { getPosts } from '@/utilities/getPosts'
import HomePageBlogCarousel from '@/components/HomePageBlogCarousel'

async function getThemePages(): Promise<ThemePage[]> {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/theme-pages?depth=2&limit=10`,
    { next: { revalidate: 3600 } },
  )
  if (!req.ok) return []
  const { docs } = await req.json()
  return docs || []
}

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

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({ slug })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  // At this point we know page is not null
  const nonNullPage = page as NonNullable<typeof page>
  const { hero, layout } = nonNullPage

  // Fetch all theme pages for conservation section tab images
  let themePages: ThemePage[] = []
  if (nonNullPage.conservationSection && nonNullPage.conservationSection.enableSection !== false) {
    themePages = await getThemePages()
  }

  // Fetch posts for homepage only
  let posts: any[] = []
  if (slug === 'home') {
    posts = await getPosts()
  }

  return (
    <article>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      {nonNullPage.conservationSection &&
        nonNullPage.conservationSection.enableSection !== false &&
        themePages.length > 0 && (
          <ConservationSectionClient
            sectionHeading={nonNullPage.conservationSection.sectionHeading || ''}
            sectionDescription={nonNullPage.conservationSection.sectionDescription || ''}
            buttonText={nonNullPage.conservationSection.buttonText || ''}
            buttonLink={nonNullPage.conservationSection.buttonLink || ''}
            tabs={themePages.map((tp) => {
              let image: string | { url: string } | undefined = ''
              if (tp.hero && tp.hero.image) {
                if (typeof tp.hero.image === 'string') {
                  image = tp.hero.image
                } else if (typeof tp.hero.image === 'object' && tp.hero.image.url) {
                  image = { url: tp.hero.image.url }
                }
              }
              return {
                label: tp.title,
                title: tp.introSection?.tagline || tp.title,
                text: tp.introSection?.content || '',
                link: '/themes/' + tp.slug,
                image,
              }
            })}
          />
        )}

      {nonNullPage.homePageProjects && (
        <HomePageProjectsClient
          sectionLabel={nonNullPage.homePageProjects.sectionLabel || ''}
          heading={nonNullPage.homePageProjects.heading || ''}
          subheading={nonNullPage.homePageProjects.subheading || ''}
          blocks={(nonNullPage.homePageProjects.blocks || []).map((block) => {
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
      {nonNullPage.homePageImpact && (
        <HomePageImpactClient
          sectionLabel={nonNullPage.homePageImpact.sectionLabel || ''}
          heading={nonNullPage.homePageImpact.heading || ''}
          description={nonNullPage.homePageImpact.description || ''}
          buttonText={nonNullPage.homePageImpact.buttonText || ''}
          blocks={(nonNullPage.homePageImpact.blocks || []).map((block): ImpactBlock => {
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
      {/* Latest Posts Section - only on homepage */}
      {slug === 'home' && posts.length > 0 && <HomePageBlogCarousel posts={posts} />}
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
