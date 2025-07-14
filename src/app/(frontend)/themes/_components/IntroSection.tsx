import React from 'react'
import { ThemePage } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import Image from 'next/image'

type Props = {
  introSection: ThemePage['introSection']
}

const IntroSection = ({ introSection }: Props) => {
  if (!introSection) {
    return null
  }

  return (
    <section className="py-12 md:py-16 md:-mt-28 relative z-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[6fr_4fr] gap-0 max-w-5xl mx-auto shadow-lg">
          {/* Left section - Orange background */}
          <div className="bg-orange-500 p-6 md:p-12 text-white">
            <h2 className="text-sm font-bold uppercase mb-6 tracking-wider">
              {introSection.tagline}
            </h2>
            <p className="text-base leading-relaxed pr-24">{introSection.content}</p>
          </div>

          {/* Right section - Light green background */}
          <div className="bg-lime-200 border-16 border-orange-500 p-6 md:p-4 flex flex-col justify-between">
            <h3 className="text-sm text-gray-600 text-center mb-8">
              {introSection.factBox?.title}
            </h3>

            <div className="flex flex-col items-center justify-center flex-grow">
              {/* Nepal map icon - will be rendered when image is uploaded */}
              {introSection.factBox?.image && typeof introSection.factBox.image !== 'string' && (
                <div className="mb-6">
                  <Image
                    src={getMediaUrl(introSection.factBox.image.url)}
                    alt={introSection.factBox.image.alt || 'Nepal map'}
                    width={120}
                    height={80}
                    className="object-contain"
                  />
                </div>
              )}

              {/* Large percentage text */}
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-900 mb-2">
                  {introSection.factBox?.statValue || '29%'}
                </div>
                <div className="text-lg text-gray-700">
                  {introSection.factBox?.statLabel || 'Area Covered in Nepal'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroSection
