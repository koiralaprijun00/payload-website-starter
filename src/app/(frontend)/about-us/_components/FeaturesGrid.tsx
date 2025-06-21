import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// The 'icon' from Payload is a string, assuming it's for an icon class or emoji
// The 'id' is automatically added by Payload for array fields
type Feature = {
  id: string
  icon: string
  title: string
  description: string
}

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.id} className="text-center bg-gray-900 border-gray-800 text-white">
              <CardHeader>
                {/* We'll just display the icon string for now. This could be an emoji or a class for an icon font. */}
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesGrid
