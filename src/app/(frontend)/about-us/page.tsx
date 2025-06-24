import React from 'react'
import RichText from '@/components/RichText'
import Hero from './_components/Hero'
import TeamSection from './_components/TeamSection'
import FeaturesGrid from './_components/FeaturesGrid'

// Helper to fetch the about-us page from Payload
async function getAboutPageData() {
  const aboutPageReq = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/about-page`,
    { cache: 'no-store' },
  )
  const aboutPageData = await aboutPageReq.json()

  const teamMembersReq = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/team-members`, {
    cache: 'no-store',
  })
  const teamMembersData = await teamMembersReq.json()

  return { aboutPageData, teamMembersData: teamMembersData.docs }
}

export default async function AboutUsPage() {
  const { aboutPageData, teamMembersData } = await getAboutPageData()

  return (
    <div className="bg-white text-mainBlue">
      <Hero {...aboutPageData.hero} />
      <section className="container mx-auto py-8 md:py-16 text-black">
        {/* Render the intro section */}
        <h2 className="text-2xl font-bold mb-4">{aboutPageData.introSection?.title}</h2>
        <RichText data={aboutPageData.introSection?.content} className="prose prose-black" />
      </section>
      <FeaturesGrid features={aboutPageData.featuresGrid} />
      <section className="container mx-auto py-8 md:py-16">
        <RichText data={aboutPageData.detailedContent} />
      </section>
      <TeamSection title={aboutPageData.teamSectionTitle} members={teamMembersData || []} />
    </div>
  )
}
