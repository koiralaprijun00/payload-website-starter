import React from 'react'
import { Metadata } from 'next'
import { getCachedGlobal } from '@/utilities/getGlobals'
import RichText from '@/components/RichText'
import type { LearnMore as LearnMoreType } from '@/payload-types'
import { motion } from 'framer-motion'

export const dynamic = 'force-dynamic'

export default async function LearnMorePage() {
  const learnMoreData = (await getCachedGlobal('learn-more', 1)()) as LearnMoreType

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-mainBlue via-blue-700 to-blue-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white opacity-5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 opacity-10 rounded-full blur-xl"></div>

        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-full mb-8"
            >
              <div className="w-2 h-2 bg-blue-200 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-100">Discover Our Impact</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            >
              {learnMoreData.title || 'Learn More'}
            </motion.h1>

            {/* Subtitle */}
            {learnMoreData.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl lg:text-3xl text-blue-100 leading-relaxed mb-12 max-w-3xl mx-auto"
              >
                {learnMoreData.subtitle}
              </motion.p>
            )}

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">30+</div>
                <div className="text-blue-200 text-sm md:text-base">Years of Impact</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">100+</div>
                <div className="text-blue-200 text-sm md:text-base">Projects Completed</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-blue-200 text-sm md:text-base">Partners Worldwide</div>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16"
            >
              <div className="w-6 h-10 border-2 border-white border-opacity-30 rounded-full mx-auto flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
              </div>
            </motion.div>
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
    title: 'Learn More - Our Work and Impact',
    description: 'Learn more about our work, impact, and mission.',
  }
}
