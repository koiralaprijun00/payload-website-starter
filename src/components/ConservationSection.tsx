'use client'
import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useScrollAnimation } from '@/utilities/useScrollAnimation'

interface Tab {
  label: string
  title: string
  text: string
  link: string
  image?: string | { url: string }
}

export interface ConservationSectionProps {
  sectionHeading: string
  sectionDescription: string
  buttonText: string
  buttonLink: string
  tabs: Tab[]
}

const ConservationSection: React.FC<ConservationSectionProps> = ({
  sectionHeading,
  sectionDescription,
  buttonText,
  buttonLink,
  tabs,
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const sectionRef = useScrollAnimation<HTMLElement>({ threshold: 0.2, triggerOnce: true })

  const getImageUrl = (image?: string | { url: string }): string => {
    if (!image) return '/default-hero.jpg'
    return typeof image === 'string' ? image : image.url || '/default-hero.jpg'
  }

  const activeTabData = tabs[activeTab] ||
    tabs[0] || {
      label: '',
      title: 'Default Title',
      text: 'Default description',
      link: '#',
      image: '/default-hero.jpg',
    }

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-4 py-16 my-16 animate-on-scroll animate-delay-200"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {sectionHeading}
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">{sectionDescription}</p>
          </div>

          {/* Tabs */}
          <div className="space-y-4">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left p-4 border-l-4 transition-all duration-300 animate-fade-in-up ${
                  activeTab === index
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
                }`}
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <div
                  className={`font-semibold mb-1 transition-colors duration-300 ${
                    activeTab === index ? 'text-orange-600' : 'text-gray-900'
                  }`}
                >
                  {tab.label}
                </div>
                {activeTab === index && (
                  <div className="text-gray-600 text-sm animate-fade-in-up">{tab.text}</div>
                )}
              </button>
            ))}
          </div>

          {/* Call to Action */}
          <div className="pt-4">
            <a
              href={buttonLink}
              className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg group animate-fade-in-up"
              style={{ animationDelay: '400ms' }}
            >
              {buttonText}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative h-96 lg:h-[500px] overflow-hidden shadow-lg animate-fade-in-up animate-delay-600">
          <Image
            src={getImageUrl(activeTabData.image)}
            alt={activeTabData.title}
            fill
            className="object-cover transition-all duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-bold mb-2">{activeTabData.title}</h3>
            <p className="text-sm opacity-90">{activeTabData.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConservationSection
