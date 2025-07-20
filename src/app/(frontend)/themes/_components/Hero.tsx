import React from 'react'
import { Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type Props = {
  title: string
  image: Media
}

const Hero = ({ title, image }: Props) => {
  const imageUrl = getMediaUrl(image?.url)

  return (
    <section
      className="h-[60vh] md:h-[80vh] bg-cover bg-center flex items-start justify-start text-white relative"
      style={{
        backgroundImage: `url("${imageUrl}")`,
        backgroundColor: '#f0f0f0', // Fallback color
      }}
    >
      <div className="mt-16 md:mt-24 ml-4 md:ml-24 px-4 md:px-0 relative z-20">
        <div className="relative inline-block text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-lg relative inline-block text-white text-left">
            {title}
          </h1>
        </div>
      </div>
    </section>
  )
}

export default Hero
