import React from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type Props = {
  image: Media
}

const ContentImage = ({ image }: Props) => {
  if (!image || typeof image === 'string') return null

  const imageUrl = getMediaUrl(image.url)

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <Image
          src={imageUrl}
          alt={image.alt || 'Content Image'}
          width={image.width || 800}
          height={image.height || 600}
          className="w-full h-auto"
        />
      </div>
    </section>
  )
}

export default ContentImage
