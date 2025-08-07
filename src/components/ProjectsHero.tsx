import React from 'react'
import Image from 'next/image'

interface ProjectsHeroProps {
  title?: string
  subtitle?: string
  description?: string
  rightImage?: string
}

export default function ProjectsHero({
  title = 'Our Projects',
  subtitle = 'Making a Difference',
  description = 'Discover our impactful conservation and community development projects across Nepal',
  rightImage = '/ujyalo-logo.png', // placeholder, replace with your image
}: ProjectsHeroProps) {
  return (
    <section className="relative h-[65vh] flex items-stretch bg-mainBlue">
      <div className="relative z-10 max-w-7xl mx-auto w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch w-full h-full">
          {/* Left side - Subtitle at top, title/desc at bottom */}
          <div className="flex flex-col justify-between h-full text-white px-8 py-8">
            {/* Subtitle at the top */}
            <div>
              <p className="text-orange-400 font-semibold text-base tracking-wide uppercase mb-2">
                {subtitle}
              </p>
            </div>
            {/* Title and description at the bottom */}
            <div className="space-y-2 mt-auto">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">{title}</h1>
              <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-lg">
                {description}
              </p>
            </div>
          </div>

          {/* Right side - Full-cover Image */}
          <div className="relative w-full h-full">
            <Image
              src={rightImage}
              alt="Professional Team"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
