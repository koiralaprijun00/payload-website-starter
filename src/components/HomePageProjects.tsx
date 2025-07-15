import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export interface ProjectRelationship {
  id: string
  slug: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface ProjectBlock {
  title: string
  description?: string
  value?: string
  image?: { url: string } | string
  bgColor?: string // Optional: for custom background color
  link?: string | ProjectRelationship | null // Accepts string, object, or null
}

export interface HomePageProjectsProps {
  sectionLabel: string
  heading: string
  subheading: string
  blocks: ProjectBlock[]
}

const getProjectUrl = (link: string | ProjectRelationship | null | undefined): string | null => {
  if (!link) return null
  if (typeof link === 'string') return link
  if (typeof link === 'object' && link.slug) return `/projects/${link.slug}`
  return null
}

const HomePageProjects: React.FC<HomePageProjectsProps> = ({
  sectionLabel,
  heading,
  subheading,
  blocks,
}) => {
  // Helper to render a single card (used for both mobile and desktop)
  const renderCard = (block: ProjectBlock, idx: number) => {
    const hasImage = !!block.image
    const imageUrl = typeof block.image === 'string' ? block.image : block.image?.url || ''
    const bg = block.bgColor || (hasImage ? 'bg-transparent' : 'bg-blue-900')
    const url = getProjectUrl(block.link)

    const CardContent = (
      <div
        className={`relative flex flex-col justify-between rounded-lg overflow-hidden shadow-md ${bg} min-h-[220px] md:min-h-0 p-4 sm:p-6 h-full transition-all duration-200 ${url ? 'cursor-pointer group' : ''}`}
      >
        {hasImage && imageUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              src={imageUrl}
              alt={block.title}
              fill
              className={`object-cover object-center transition-transform duration-300 ${url ? 'group-hover:scale-110' : ''}`}
              style={{ objectFit: 'cover', opacity: 0.7 }}
              sizes="100vw"
            />
          </div>
        )}
        <div className={`relative z-10 flex flex-col h-full text-white`}>
          {block.value && (
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 w-2 font-sansita">
              {block.value}
            </div>
          )}
          <div className="flex-1" />
          <div>
            <div className="text-lg sm:text-md font-normal mb-1 font-sansita">{block.title}</div>
            {block.description && (
              <div className="text-xs sm:text-sm md:text-base font-normal opacity-90 leading-relaxed mt-2 font-fira-sans">
                {block.description}
              </div>
            )}
          </div>
        </div>
        {/* Arrow button on hover for link blocks */}
        {url && (
          <div className="absolute bottom-4 right-4 z-20">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 text-orange-500 shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
              <ArrowRight size={24} />
            </span>
          </div>
        )}
      </div>
    )
    return url ? (
      <Link
        href={url}
        key={idx}
        className="block h-full group focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        {CardContent}
      </Link>
    ) : (
      <div key={idx} className="h-full">
        {CardContent}
      </div>
    )
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-16 my-16">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="flex items-center space-x-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-orange-500 inline-block" />
          <span className="uppercase text-xs font-bold tracking-wider text-gray-700">
            {sectionLabel}
          </span>
        </div>
        <h2 className="font-sansita text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-tight tracking-tight">
          {heading}
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-6 font-fira-sans">{subheading}</p>
        <hr className="w-1/2 border-t border-gray-300 my-4" />
      </div>

      {/* Grid layout - Mobile: stacked, Desktop: 3 columns */}
      <div className="block md:hidden space-y-4">
        {/* Mobile layout - simple stacking */}
        {blocks.map((block, idx) => renderCard(block, idx))}
      </div>

      {/* Desktop layout – 3×3 magazine grid */}
      <div className="hidden md:grid md:grid-cols-3 md:grid-rows-3 md:h-[900px] gap-6">
        {/* Block 1 – left, spans 2 rows */}
        {blocks[0] && (
          <div className="col-start-1 row-start-1 row-span-2 flex flex-col">
            {renderCard(blocks[0], 0)}
          </div>
        )}
        {/* Block 2 – centre, spans 3 rows (tallest) */}
        {blocks[1] && (
          <div className="col-start-2 row-start-1 row-span-3 flex flex-col">
            {renderCard(blocks[1], 1)}
          </div>
        )}
        {/* Block 3 – top-right */}
        {blocks[2] && (
          <div className="col-start-3 row-start-1 flex flex-col">{renderCard(blocks[2], 2)}</div>
        )}
        {/* Block 4 – bottom-right, spans 2 rows */}
        {blocks[3] && (
          <div className="col-start-3 row-start-2 row-span-2 flex flex-col">
            {renderCard(blocks[3], 3)}
          </div>
        )}
        {/* Block 5 – bottom-left */}
        {blocks[4] && (
          <div className="col-start-1 row-start-3 flex flex-col">{renderCard(blocks[4], 4)}</div>
        )}
      </div>
    </section>
  )
}

export default HomePageProjects
