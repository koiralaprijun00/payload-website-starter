import React from 'react'
import Image from 'next/image'

export interface ProjectBlock {
  title: string
  description?: string
  value?: string
  image?: { url: string } | string
  bgColor?: string // Optional: for custom background color
}

export interface HomePageProjectsProps {
  sectionLabel: string
  heading: string
  subheading: string
  blocks: ProjectBlock[]
}

const HomePageProjects: React.FC<HomePageProjectsProps> = ({
  sectionLabel,
  heading,
  subheading,
  blocks,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="flex items-center space-x-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-orange-500 inline-block" />
          <span className="uppercase text-xs font-bold tracking-wider text-gray-700">
            {sectionLabel}
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight">
          {heading}
        </h2>
        <p className="text-lg text-gray-700 mb-6">{subheading}</p>
        <hr className="w-1/2 border-t border-gray-300 my-4" />
      </div>

      {/* Grid layout - Mobile: stacked, Desktop: 3 columns */}
      <div className="block md:hidden space-y-4">
        {/* Mobile layout - simple stacking */}
        {blocks.map((block, idx) => {
          const hasImage = !!block.image
          const imageUrl = typeof block.image === 'string' ? block.image : block.image?.url || ''
          const bg = block.bgColor || (hasImage ? 'bg-transparent' : 'bg-blue-900')

          return (
            <div
              key={idx}
              className={`relative flex flex-col justify-between rounded-lg overflow-hidden shadow-md ${bg} min-h-[220px] p-6`}
            >
              {hasImage && imageUrl && (
                <Image
                  src={imageUrl}
                  alt={block.title}
                  fill
                  className="object-cover object-center z-0"
                  style={{ objectFit: 'cover', opacity: 0.7 }}
                  sizes="100vw"
                />
              )}
              <div className={`relative z-10 ${hasImage ? 'text-white' : 'text-white'}`}>
                {block.value && <div className="text-3xl font-bold mb-2">{block.value}</div>}
                <div className="text-lg font-semibold mb-2">{block.title}</div>
                {block.description && (
                  <div className="text-sm font-normal opacity-90 leading-relaxed">
                    {block.description}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Desktop layout - CSS Grid */}
      <div className="hidden md:grid md:grid-cols-3 md:grid-rows-3 gap-6 h-[900px]">
        {/* Block 1 - Left column, top, tall */}
        {blocks[0] && (
          <div className="col-start-1 row-start-1 row-span-2 flex flex-col">
            <div
              className={`relative flex flex-col justify-between rounded-lg overflow-hidden shadow-md ${
                blocks[0].bgColor || (blocks[0].image ? 'bg-transparent' : 'bg-blue-900')
              } h-full p-6`}
            >
              {blocks[0].image && (
                <Image
                  src={
                    typeof blocks[0].image === 'string'
                      ? blocks[0].image
                      : blocks[0].image?.url || ''
                  }
                  alt={blocks[0].title}
                  fill
                  className="object-cover object-center z-0"
                  style={{ objectFit: 'cover', opacity: 0.7 }}
                  sizes="33vw"
                />
              )}
              <div className="relative z-10 text-white">
                {blocks[0].value && (
                  <div className="text-4xl lg:text-5xl font-bold mb-2">{blocks[0].value}</div>
                )}
                <div className="text-xl lg:text-2xl font-semibold mb-2">{blocks[0].title}</div>
                {blocks[0].description && (
                  <div className="text-base font-normal opacity-90 leading-relaxed">
                    {blocks[0].description}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Block 5 - Left column, bottom, short */}
        {blocks[4] && (
          <div className="col-start-1 row-start-3 flex flex-col">
            <div
              className={`relative flex flex-col justify-between rounded-lg overflow-hidden shadow-md ${
                blocks[4].bgColor || (blocks[4].image ? 'bg-transparent' : 'bg-blue-900')
              } h-full p-6`}
            >
              {blocks[4].image && (
                <Image
                  src={
                    typeof blocks[4].image === 'string'
                      ? blocks[4].image
                      : blocks[4].image?.url || ''
                  }
                  alt={blocks[4].title}
                  fill
                  className="object-cover object-center z-0"
                  style={{ objectFit: 'cover', opacity: 0.7 }}
                  sizes="33vw"
                />
              )}
              <div className="relative z-10 text-white">
                {blocks[4].value && (
                  <div className="text-4xl lg:text-5xl font-bold mb-2">{blocks[4].value}</div>
                )}
                <div className="text-xl lg:text-2xl font-semibold mb-2">{blocks[4].title}</div>
                {blocks[4].description && (
                  <div className="text-base font-normal opacity-90 leading-relaxed">
                    {blocks[4].description}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Block 2 - Center column, full height */}
        {blocks[1] && (
          <div className="col-start-2 row-start-1 row-span-3 flex flex-col">
            <div
              className={`relative flex flex-col justify-between rounded-lg overflow-hidden shadow-md ${
                blocks[1].bgColor || (blocks[1].image ? 'bg-transparent' : 'bg-blue-900')
              } h-full p-6`}
            >
              {blocks[1].image && (
                <Image
                  src={
                    typeof blocks[1].image === 'string'
                      ? blocks[1].image
                      : blocks[1].image?.url || ''
                  }
                  alt={blocks[1].title}
                  fill
                  className="object-cover object-center z-0"
                  style={{ objectFit: 'cover', opacity: 0.7 }}
                  sizes="33vw"
                />
              )}
              <div className="relative z-10 text-white">
                {blocks[1].value && (
                  <div className="text-4xl lg:text-5xl font-bold mb-2">{blocks[1].value}</div>
                )}
                <div className="text-xl lg:text-2xl font-semibold mb-2">{blocks[1].title}</div>
                {blocks[1].description && (
                  <div className="text-base font-normal opacity-90 leading-relaxed">
                    {blocks[1].description}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Block 3 - Right column, top, short */}
        {blocks[2] && (
          <div className="col-start-3 row-start-1 flex flex-col">
            <div
              className={`relative flex flex-col justify-between rounded-lg overflow-hidden shadow-md ${
                blocks[2].bgColor || (blocks[2].image ? 'bg-transparent' : 'bg-blue-900')
              } h-full p-6`}
            >
              {blocks[2].image && (
                <Image
                  src={
                    typeof blocks[2].image === 'string'
                      ? blocks[2].image
                      : blocks[2].image?.url || ''
                  }
                  alt={blocks[2].title}
                  fill
                  className="object-cover object-center z-0"
                  style={{ objectFit: 'cover', opacity: 0.7 }}
                  sizes="33vw"
                />
              )}
              <div className="relative z-10 text-white">
                {blocks[2].value && (
                  <div className="text-4xl lg:text-5xl font-bold mb-2">{blocks[2].value}</div>
                )}
                <div className="text-xl lg:text-2xl font-semibold mb-2">{blocks[2].title}</div>
                {blocks[2].description && (
                  <div className="text-base font-normal opacity-90 leading-relaxed">
                    {blocks[2].description}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Block 4 - Right column, bottom, tall */}
        {blocks[3] && (
          <div className="col-start-3 row-start-2 row-span-2 flex flex-col">
            <div
              className={`relative flex flex-col justify-between rounded-lg overflow-hidden shadow-md ${
                blocks[3].bgColor || (blocks[3].image ? 'bg-transparent' : 'bg-blue-900')
              } h-full p-6`}
            >
              {blocks[3].image && (
                <Image
                  src={
                    typeof blocks[3].image === 'string'
                      ? blocks[3].image
                      : blocks[3].image?.url || ''
                  }
                  alt={blocks[3].title}
                  fill
                  className="object-cover object-center z-0"
                  style={{ objectFit: 'cover', opacity: 0.7 }}
                  sizes="33vw"
                />
              )}
              <div className="relative z-10 text-white">
                {blocks[3].value && (
                  <div className="text-4xl lg:text-5xl font-bold mb-2">{blocks[3].value}</div>
                )}
                <div className="text-xl lg:text-2xl font-semibold mb-2">{blocks[3].title}</div>
                {blocks[3].description && (
                  <div className="text-base font-normal opacity-90 leading-relaxed">
                    {blocks[3].description}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default HomePageProjects
