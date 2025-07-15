import React from 'react'
import type { Page } from '@/payload-types'
import Image from 'next/image'

export const HomePageV1Hero: React.FC<Page['hero']> = (props) => {
  // Extract fields from props, using fallback values
  const category = props.category || 'Category'
  const title = props.title || 'Title'
  const description = props.description || 'Description'
  const buttonText = props.buttonText || 'Learn More'
  const buttonLink = props.buttonLink || '#'
  const imageUrl =
    typeof props.media === 'object' && props.media?.url ? props.media.url : '/default-image.jpg'

  return (
    <section className="w-full relative min-h-[60vh] py-2 my-16">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-center min-h-[600px]">
          {/* Image Container - Full width background */}
          <div className="absolute inset-0 flex items-center justify-end pr-8">
            <div className="w-full max-w-5xl h-[600px] relative">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover rounded-lg"
                style={{ objectFit: 'cover' }}
                sizes="100vw"
              />
            </div>
          </div>

          {/* Blue Container - Overlapping on the left */}
          <div className="relative z-10 flex items-center justify-start w-full">
            <div className="bg-[#17446F] text-white p-6 md:p-8 max-w-md w-full ml-8 md:ml-16 shadow-lg">
              <div className="flex items-center mb-3">
                <span className="h-2 w-2 rounded-full bg-orange-500 mr-2 inline-block" />
                <span className="uppercase font-bold tracking-wide text-xs">{category}</span>
              </div>
              <h1 className="text-lg md:text-xl font-bold mb-3 leading-tight">{title}</h1>
              <p className="mb-6 text-sm md:text-base font-normal text-white/90">{description}</p>
              <a
                href={buttonLink}
                className="inline-flex items-center font-semibold text-sm text-white group"
              >
                {buttonText}
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePageV1Hero
