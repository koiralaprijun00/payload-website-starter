import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'

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
        className={`relative flex flex-col justify-between rounded-lg overflow-hidden shadow-md ${bg} min-h-[180px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-0 p-3 sm:p-4 md:p-6 h-full transition-all duration-200 ${url ? 'cursor-pointer group' : ''}`}
      >
        {hasImage && imageUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              src={imageUrl}
              alt={block.title}
              fill
              className={`object-cover object-center transition-transform duration-300 ${url ? 'group-hover:scale-110' : ''}`}
              style={{ objectFit: 'cover', opacity: 0.7 }}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </div>
        )}
        <div className={`relative z-10 flex flex-col h-full text-white`}>
          {block.value && (
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 w-2 font-sansita">
              {block.value}
            </div>
          )}
          <div className="flex-1" />
          <div>
            <div className="text-sm sm:text-base md:text-lg lg:text-xl font-normal mb-1 font-sansita">
              {block.title}
            </div>
            {block.description && (
              <div className="text-xs sm:text-sm md:text-base lg:text-lg font-normal opacity-90 leading-relaxed mt-1 sm:mt-2 font-fira-sans">
                {block.description}
              </div>
            )}
          </div>
        </div>
        {/* Arrow button on hover for link blocks */}
        {url && (
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20">
            <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 text-orange-500 shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
              <ArrowRight size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
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

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <motion.section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 xl:py-28"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
    >
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16 lg:mb-20">
        <div className="flex items-center space-x-2 mb-2">
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-orange-500 inline-block" />
          <span className="uppercase text-xs sm:text-sm font-bold tracking-wider text-gray-700">
            {sectionLabel}
          </span>
        </div>
        <h2 className="font-sansita text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 leading-tight tracking-tight">
          {heading}
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 font-fira-sans">
          {subheading}
        </p>
        <hr className="w-1/2 border-t border-gray-300 my-3 sm:my-4" />
      </div>

      {/* Grid layout - Mobile: stacked, Desktop: 3 columns */}
      <motion.div
        className="block md:hidden space-y-4 sm:space-y-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Mobile layout - simple stacking */}
        {blocks.map((block, idx) => (
          <motion.div key={idx} variants={cardVariants}>
            {renderCard(block, idx)}
          </motion.div>
        ))}
      </motion.div>

      {/* Desktop layout – 3×3 magazine grid */}
      <motion.div
        className="hidden md:grid md:grid-cols-3 md:grid-rows-3 md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[900px] gap-6 sm:gap-8 lg:gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Block 1 – left, spans 2 rows */}
        {blocks[0] && (
          <motion.div
            className="col-start-1 row-start-1 row-span-2 flex flex-col"
            variants={cardVariants}
          >
            {renderCard(blocks[0], 0)}
          </motion.div>
        )}
        {/* Block 2 – centre, spans 3 rows (tallest) */}
        {blocks[1] && (
          <motion.div
            className="col-start-2 row-start-1 row-span-3 flex flex-col"
            variants={cardVariants}
          >
            {renderCard(blocks[1], 1)}
          </motion.div>
        )}
        {/* Block 3 – top-right */}
        {blocks[2] && (
          <motion.div className="col-start-3 row-start-1 flex flex-col" variants={cardVariants}>
            {renderCard(blocks[2], 2)}
          </motion.div>
        )}
        {/* Block 4 – bottom-right, spans 2 rows */}
        {blocks[3] && (
          <motion.div
            className="col-start-3 row-start-2 row-span-2 flex flex-col"
            variants={cardVariants}
          >
            {renderCard(blocks[3], 3)}
          </motion.div>
        )}
        {/* Block 5 – bottom-left */}
        {blocks[4] && (
          <motion.div className="col-start-1 row-start-3 flex flex-col" variants={cardVariants}>
            {renderCard(blocks[4], 4)}
          </motion.div>
        )}
      </motion.div>

      {/* See all projects CTA */}
      <div className="mt-6 sm:mt-8 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-blue-900 font-semibold hover:underline text-sm sm:text-base lg:text-lg"
        >
          See all projects
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Link>
      </div>
    </motion.section>
  )
}

export default HomePageProjects
