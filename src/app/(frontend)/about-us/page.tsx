import React from 'react'
import RichText from '@/components/RichText'
import Hero from './_components/Hero'
import FeaturesGrid from './_components/FeaturesGrid'
import VolunteerCTA from './_components/VolunteerCTA'

// Helper to fetch the about-us page from Payload
async function getAboutPageData() {
  const aboutPageReq = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/about-page`,
    { next: { revalidate: 86400 } },
  )
  const aboutPageData = await aboutPageReq.json()

  return { aboutPageData }
}

export default async function AboutUsPage() {
  const { aboutPageData } = await getAboutPageData()

  return (
    <div className="bg-white text-mainBlue">
      <Hero {...aboutPageData.hero} />
      <FeaturesGrid features={aboutPageData.featuresGrid} />
      <section className="container mx-auto py-8 md:py-16">
        <RichText data={aboutPageData.detailedContent} />
      </section>
      {aboutPageData.volunteerCta && <VolunteerCTA data={aboutPageData.volunteerCta} />}
    </div>
  )
}
