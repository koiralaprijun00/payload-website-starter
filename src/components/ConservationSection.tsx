'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'

export interface ConservationTab {
  label: string
  title: string
  text: string
  link: string
  image?: { url: string } | string
}

export interface ConservationSectionProps {
  sectionHeading: string
  sectionDescription: string
  tabs: ConservationTab[]
  buttonText?: string // Added optional buttonText
  buttonLink?: string // Added optional buttonLink
  pillLabel?: string // Added optional pillLabel
}

const ConservationSection: React.FC<ConservationSectionProps> = ({
  sectionHeading,
  sectionDescription,
  tabs,
  pillLabel = 'OUR PROGRAMMES', // Default to OUR PROGRAMMES
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.label || '')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isVisible, setIsVisible] = useState(false)
  const preloadedUrlsRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const resolveImageUrl = (img?: { url: string } | string): string => {
    const raw = typeof img === 'string' ? img : img?.url || ''
    if (!raw) return ''
    try {
      if (raw.startsWith('http')) return raw
      return `${process.env.NEXT_PUBLIC_PAYLOAD_URL || ''}${raw}`
    } catch {
      return ''
    }
  }

  const preloadImage = (url: string) => {
    if (!url || preloadedUrlsRef.current.has(url)) return
    const i = new window.Image()
    i.src = url
    preloadedUrlsRef.current.add(url)
  }

  // Preload all tab images on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    tabs.forEach((t) => {
      const url = resolveImageUrl(t.image)
      if (url) preloadImage(url)
    })
  }, [tabs])

  if (!tabs || tabs.length === 0) {
    return null
  }

  const activeTabData = tabs.find((tab) => tab.label === activeTab) || tabs[0]
  if (!activeTabData) return null

  const imageUrl = resolveImageUrl(activeTabData.image)

  const leftColVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }
  const rightColVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
  }

  return (
    <motion.div
      className="bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 xl:py-28"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      variants={{}}
    >
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] items-start gap-8 sm:gap-12 lg:gap-16">
          {/* Left Column */}
          <motion.div className="space-y-2 sm:space-y-3" variants={leftColVariants}>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 animate-pulse"></div>
              <span className="text-gray-600 font-medium tracking-wide uppercase text-xs sm:text-sm">
                {pillLabel}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-relaxed mb-3 sm:mb-4">
              {sectionHeading}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-tight">
              {sectionDescription}
            </p>
          </motion.div>

          {/* Right Column */}
          <motion.div className="space-y-4 sm:space-y-6" variants={rightColVariants}>
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-2 sm:mb-4">
              {tabs.map((tab, idx) => {
                const tabImageUrl = resolveImageUrl(tab.image)
                return (
                  <button
                    key={`${tab.label}-${idx}`}
                    onClick={() => setActiveTab(tab.label)}
                    onMouseEnter={() => preloadImage(tabImageUrl)}
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 border ${
                      activeTab === tab.label
                        ? 'bg-orange-500 text-white shadow-md border-orange-500'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Main Image + Content Box Wrapper */}
            <div className="relative mb-4 sm:mb-6 z-0">
              {imageUrl && (
                <motion.div
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96 relative rounded overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <Image
                    src={imageUrl}
                    alt={activeTabData.title}
                    fill
                    className="object-cover rounded"
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    priority
                    loading="eager"
                  />
                </motion.div>
              )}
              {/* Content Box - Overlapping (entire box clickable) */}
              <Link href={activeTabData.link || '#'} className="block group">
                <motion.div
                  className="bg-blue-900 text-white px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 shadow-lg rounded w-full left-0 bottom-0 relative mt-3 sm:mt-4 lg:absolute lg:-left-16 xl:-left-20 2xl:-left-24 lg:-bottom-20 xl:-bottom-24 2xl:-bottom-32 lg:w-[85%] lg:mt-0 z-10 transform transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                >
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 lg:mb-4 flex items-center space-x-2 sm:space-x-3">
                    <span>{activeTabData.title}</span>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white animate-bounce"></div>
                  </h2>
                  <p className="text-blue-100 leading-relaxed mb-2 sm:mb-3 lg:mb-4 text-sm sm:text-base lg:text-lg">
                    {activeTabData.text}
                  </p>
                  {/* Keep a subtle affordance */}
                  <div className="flex items-center space-x-2 text-white/90 font-medium transition-colors duration-300 text-sm sm:text-base">
                    <span className="underline decoration-white/40 group-hover:decoration-white">
                      Learn More
                    </span>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ConservationSection
