'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

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
  buttonText: string
  buttonLink: string
  tabs: ConservationTab[]
}

const ConservationSection: React.FC<ConservationSectionProps> = ({
  sectionHeading,
  sectionDescription,
  buttonText,
  buttonLink,
  tabs,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.label || '')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  if (!tabs || tabs.length === 0) {
    return null
  }

  const activeTabData = tabs.find((tab) => tab.label === activeTab) || tabs[0]
  if (!activeTabData) return null
  const imageUrl =
    typeof activeTabData.image === 'string' ? activeTabData.image : activeTabData.image?.url || ''

  return (
    <div className="bg-white flex items-center justify-center px-8 mb-48">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] items-start gap-10">
          {/* Left Column */}
          <div
            className={`space-y-2 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-orange-500 animate-pulse"></div>
              <span className="text-gray-600 font-medium tracking-wide uppercase text-sm">
                Our Themes
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 leading-relaxed mb-4">
              {sectionHeading}
            </h1>
            <p className="text-md text-gray-900 leading-tight">{sectionDescription}</p>
            <a href={buttonLink}>
              <button className="group bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 mt-4 font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                <span className="flex items-center space-x-2">
                  <span>{buttonText}</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </button>
            </a>
          </div>

          {/* Right Column */}
          <div
            className={`space-y-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
          >
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-2">
              {tabs.map((tab, idx) => (
                <button
                  key={`${tab.label}-${idx}`}
                  onClick={() => setActiveTab(tab.label)}
                  className={`px-3 py-1.5 text-sm font-medium transition-all duration-300 transform hover:scale-105 border ${
                    activeTab === tab.label
                      ? 'bg-orange-500 text-white shadow-md border-orange-500'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Main Image + Content Box Wrapper */}
            <div className="relative mb-6 z-0">
              {imageUrl && (
                <div className="w-full h-64 sm:h-80 md:h-[32rem] relative rounded overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={activeTabData.title}
                    fill
                    className="object-cover rounded"
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              {/* Content Box - Overlapping */}
              <div
                className="
                bg-blue-900 text-white px-4 py-4 md:px-8 md:py-4 shadow-lg rounded
                w-full left-0 bottom-0 relative mt-4
                md:absolute md:-left-20 md:-bottom-32 md:w-[85%] md:mt-0
                z-10
                transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2
              "
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center space-x-3">
                  <span>{activeTabData.title}</span>
                  <div className="w-2 h-2 bg-white animate-bounce"></div>
                </h2>
                <p className="text-blue-100 leading-relaxed mb-6">{activeTabData.text}</p>
                <a
                  href={activeTabData.link || '#'}
                  className="group flex items-center space-x-2 text-white font-medium hover:text-orange-200 transition-colors duration-300"
                >
                  <span>Learn More</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConservationSection
