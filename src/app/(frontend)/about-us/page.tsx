import React from 'react'
import RichText from '@/components/RichText'
import Hero from './_components/Hero'
import FeaturesGrid from './_components/FeaturesGrid'
import VolunteerCTA from './_components/VolunteerCTA'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

// Helper to fetch the about-us page from Payload
async function getAboutPageData() {
  const payload = await getPayload({ config: configPromise })
  
  const aboutPageData = await payload.findGlobal({
    slug: 'about-page',
    draft: false,
  })

  return { aboutPageData }
}

export default async function AboutUsPage() {
  const { aboutPageData } = await getAboutPageData()

  // Normalize hero: Payload returns backgroundImage as string | Media (where url can be null)
  // Hero component expects { url?: string } | undefined
  const rawBg = aboutPageData.hero?.backgroundImage
  const heroProps = {
    ...aboutPageData.hero,
    description: aboutPageData.hero?.description ?? undefined,
    backgroundImage:
      rawBg == null
        ? undefined
        : typeof rawBg === 'string'
          ? { url: rawBg }
          : { url: rawBg.url ?? undefined },
  }

  // Normalize featuresGrid: Payload may have id as string | null; components expect string | undefined
  const featuresGrid = (aboutPageData.featuresGrid ?? []).map((f) => ({
    ...f,
    id: f.id ?? undefined,
    // For imageCard blocks the image relationship may come back as string | Media
    ...(f.blockType === 'imageCard' && {
      image:
        typeof f.image === 'string'
          ? { url: f.image }
          : { url: (f.image as { url?: string | null }).url ?? undefined },
    }),
  }))

  // Normalize volunteerCta image
  const rawCtaImage = aboutPageData.volunteerCta?.image
  const rawCtaImageUrl =
    rawCtaImage == null
      ? undefined
      : typeof rawCtaImage === 'string'
        ? rawCtaImage
        : ((rawCtaImage as { url?: string | null }).url ?? undefined)
  const volunteerCta = aboutPageData.volunteerCta
    ? {
        ...aboutPageData.volunteerCta,
        image: rawCtaImageUrl ? { url: rawCtaImageUrl } : undefined,
      }
    : undefined

  return (
    <div className="text-mainBlue">
      <Hero {...heroProps} />
      <FeaturesGrid features={featuresGrid as Parameters<typeof FeaturesGrid>[0]['features']} />
      <section className="container mx-auto py-8 md:py-16">
        <RichText data={aboutPageData.detailedContent} />
      </section>
      {volunteerCta && <VolunteerCTA data={volunteerCta} />}
    </div>
  )
}
