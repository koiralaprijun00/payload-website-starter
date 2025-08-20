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
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start max-w-7xl mx-auto">
          {/* Left: Main Statement */}
          <div>
            {mainStatement && (
              <>
                <span className="text-orange-600 font-bold uppercase tracking-wide text-xs sm:text-sm mb-2 block">
                  {mainStatement.subheading}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-mainBlue mb-4 sm:mb-6 lg:mb-8">
                  {mainStatement.title}
                </h2>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-700 mb-6 sm:mb-8">
                  {mainStatement.description}
                </p>
              </>
            )}
          </div>
          {/* Right: Supporting Statements */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10 xl:space-y-12">
            {supportingBlocks.map((block, idx) => (
              <div key={block.id || idx}>
                <span className="text-orange-600 font-bold uppercase tracking-wide text-xs mb-1 block">
                  {block.subheading}
                </span>
                <h3
                  className={`font-bold text-lg sm:text-xl lg:text-2xl mb-1 ${block.title.toLowerCase().includes('vision') ? 'text-black' : 'text-black'}`}
                >
                  {block.title}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base lg:text-lg">{block.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesGrid
