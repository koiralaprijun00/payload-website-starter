import Image from 'next/image'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// The 'icon' from Payload is a string, assuming it's for an icon class or emoji
// The 'id' is automatically added by Payload for array fields
// Now support both imageCard and iconCard blocks

type ImageCard = {
  id?: string
  blockType: 'imageCard'
  image: { url: string }
  alt?: string
}
type IconCard = {
  id?: string
  blockType: 'iconCard'
  icon: string
  title: string
  description: string
}
type Feature = ImageCard | IconCard

type FeaturesGridProps = {
  features: Feature[]
}

const FeaturesGrid: React.FC<FeaturesGridProps> = ({ features }) => {
  if (!features || features.length === 0) {
    return null
  }

  return (
    <section className="features-grid py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, idx) => {
            if (feature.blockType === 'imageCard' && feature.image) {
              return (
                <div key={feature.id || idx} className="w-full h-full">
                  <Image
                    src={feature.image.url}
                    alt={feature.alt || ''}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              )
            }
            if (feature.blockType === 'iconCard') {
              return (
                <Card
                  key={feature.id || idx}
                  className="bg-[#6C93C0] text-white h-full flex flex-col justify-center"
                >
                  <CardHeader>
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              )
            }
            return null
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesGrid
