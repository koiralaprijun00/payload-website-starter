import React from 'react'
import { Metadata } from 'next'
import { getCachedGlobal } from '@/utilities/getGlobals'
import RichText from '@/components/RichText'
import type { LearnMore as LearnMoreType } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function LearnMorePage() {
  const learnMoreData = (await getCachedGlobal('learn-more', 1)()) as LearnMoreType

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-mainBlue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {learnMoreData.title || 'Learn More'}
            </h1>
            {learnMoreData.subtitle && (
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                {learnMoreData.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

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
                  Content will appear here once it's added from the admin panel.
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
    title: 'Learn More - Our Work and Impact',
    description: 'Learn more about our work, impact, and mission.',
  }
}
