import React from 'react'

// Types remain the same

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
  subheading: string
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

  // Assume the first iconCard is the main statement, rest are supporting blocks
  const mainStatement = features.find((f) => f.blockType === 'iconCard') as IconCard | undefined
  const supportingBlocks = features.filter(
    (f) => f.blockType === 'iconCard' && f !== mainStatement,
  ) as IconCard[]

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Main Statement */}
        <div>
          {mainStatement && (
            <>
              <span className="text-orange-600 font-bold uppercase tracking-wide text-sm mb-2 block">
                {mainStatement.subheading}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-8">
                {mainStatement.title}
              </h2>
              <p className="text-lg text-gray-700 mb-8">{mainStatement.description}</p>
            </>
          )}
        </div>
        {/* Right: Supporting Statements */}
        <div className="space-y-10">
          {supportingBlocks.map((block, idx) => (
            <div key={block.id || idx}>
              <span className="text-black font-bold uppercase tracking-wide text-xs mb-1 block">
                {block.subheading}
              </span>
              <h3
                className={`font-bold text-xl mb-1 ${block.title.toLowerCase().includes('vision') ? 'text-black' : 'text-black'}`}
              >
                {block.title}
              </h3>
              <p className="text-gray-700 text-base">{block.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesGrid
