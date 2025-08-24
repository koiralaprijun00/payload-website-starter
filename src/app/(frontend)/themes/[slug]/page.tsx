import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import type { ThemePage } from '@/payload-types'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Hero from '@/app/(frontend)/themes/_components/Hero'
import IntroSection from '@/app/(frontend)/themes/_components/IntroSection'
import MainContent from '@/app/(frontend)/themes/_components/MainContent'
import ContentImage from '@/app/(frontend)/themes/_components/ContentImage'

async function queryThemePageBySlug({ slug }: { slug: string }): Promise<ThemePage | null> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'theme-pages',
    draft: false,
    limit: 1,
    overrideAccess: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const themePages = await payload.find({
    collection: 'theme-pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return themePages.docs?.map(({ slug }) => ({ slug })) || []
}

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function ThemePageComponent({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise

  const themePage = await queryThemePageBySlug({ slug })

  if (!themePage) {
    return notFound()
  }

  return (
    <article>
      {draft && <LivePreviewListener />}

      <Hero title={themePage.title} image={themePage.hero.image as any} />
      <IntroSection introSection={themePage.introSection} />
      <MainContent mainContent={themePage.mainContent} />
      <ContentImage image={themePage.contentImage as any} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const themePage = await queryThemePageBySlug({ slug })

  if (!themePage) {
    return {}
  }

  const title = `${themePage.title} | Ujalyo Bardiya`
  const description = themePage.introSection?.tagline || ''
  const imageUrl =
    typeof themePage.hero.image === 'object' && themePage.hero.image?.url
      ? themePage.hero.image.url
      : ''

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/themes/${slug}`,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
  }
}
