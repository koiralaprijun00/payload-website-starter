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

  return (
    <div className="text-mainBlue">
      <Hero {...aboutPageData.hero} />
      <FeaturesGrid features={aboutPageData.featuresGrid} />
      <section className="container mx-auto py-8 md:py-16">
        <RichText data={aboutPageData.detailedContent} />
      </section>
      {aboutPageData.volunteerCta && <VolunteerCTA data={aboutPageData.volunteerCta} />}
    </div>
  )
}
