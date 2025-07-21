'use client'
import React from 'react'
import Image from 'next/image'
import { useScrollAnimation } from '@/utilities/useScrollAnimation'

export interface ImpactBlock {
  icon: string | { url: string }
  value: string
  label: string
  bgColor?: string
}

export interface HomePageImpactProps {
  sectionLabel: string
  heading: string
  description: string
  buttonText: string
  buttonLink: string
  blocks: ImpactBlock[]
}

const HomePageImpact: React.FC<HomePageImpactProps> = ({
  sectionLabel,
  heading,
  description,
  buttonText,
  buttonLink,
  blocks,
}) => {
  const sectionRef = useScrollAnimation<HTMLElement>({ threshold: 0.2, triggerOnce: true })

  const renderIcon = (icon: string | { url: string }) => {
    if (typeof icon === 'object' && icon.url) {
      return (
        <Image
          src={icon.url}
          alt="Impact icon"
          width={64}
          height={64}
          className="w-16 h-16 object-contain"
        />
      )
    }
    if (typeof icon === 'string' && icon) {
      return (
        <Image
          src={icon}
          alt="Impact icon"
          width={64}
          height={64}
          className="w-16 h-16 object-contain"
        />
      )
    }
    return (
      <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
        <span className="text-blue-600 text-2xl font-bold">?</span>
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-4 py-16 my-16 animate-on-scroll animate-delay-600"
    >
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center space-x-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-orange-500 inline-block" />
          <span className="uppercase text-xs font-bold tracking-wider text-gray-700">
            {sectionLabel}
          </span>
        </div>
        <h2 className="font-sansita text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight max-w-4xl">
          {heading}
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-8 font-fira-sans max-w-3xl leading-relaxed">
          {description}
        </p>
        <hr className="w-1/2 border-t border-gray-300 my-4" />
        {buttonText && buttonLink && (
          <a
            href={buttonLink}
            className="mt-6 inline-flex items-center px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            {buttonText}
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        )}
      </div>

      {/* Mobile: Stack vertically with margins */}
      <div className="sm:hidden space-y-8">
        {blocks.map((block, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-6 animate-fade-in-up"
            style={{ animationDelay: `${idx * 200 + 600}ms` }}
          >
            <div className="mb-4">{renderIcon(block.icon)}</div>
            <div className="text-4xl md:text-5xl font-bold font-sansita mb-2 text-gray-900">
              {block.value}
            </div>
            <div className="text-lg font-medium font-fira-sans text-gray-700">{block.label}</div>
          </div>
        ))}
      </div>

      {/* Desktop: Two-column layout */}
      <div className="hidden sm:grid sm:grid-cols-2 gap-12 items-center">
        {blocks.map((block, idx) => {
          const isRight = idx % 2 === 1
          const bgColor = block.bgColor || 'bg-blue-50'
          return (
            <div
              key={idx}
              className={`relative flex items-center gap-6 p-8 rounded-lg ${bgColor} animate-fade-in-up`}
              style={{
                animationDelay: `${idx * 200 + 600}ms`,
                gridColumn: isRight ? 2 : 1,
                gridRow: Math.floor(idx / 2) + 1,
              }}
            >
              <div className="flex-shrink-0">{renderIcon(block.icon)}</div>
              <div>
                <div className="text-4xl md:text-5xl font-bold font-sansita mb-2 text-gray-900">
                  {block.value}
                </div>
                <div className="text-lg font-medium font-fira-sans text-gray-700">
                  {block.label}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default HomePageImpact
