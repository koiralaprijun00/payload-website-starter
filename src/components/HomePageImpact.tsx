import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

export interface ImpactBlock {
  icon?: { url: string } | string
  value: string
  label: string
  bgColor?: string
  bgImage?: string // Optional: for background images
}

export interface HomePageImpactProps {
  sectionLabel: string
  heading: string
  description: string
  buttonText?: string
  showLearnMoreButton?: boolean
  blocks: ImpactBlock[]
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
const textColVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.3 } },
}

const HomePageImpact: React.FC<HomePageImpactProps> = ({
  sectionLabel,
  heading,
  description,
  buttonText,
  showLearnMoreButton = true,
  blocks,
}) => {
  return (
    <motion.section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 xl:py-28"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-8 sm:gap-12 lg:gap-16">
        {/* Left: Custom grid layout */}
        <motion.div className="flex-1 order-2 lg:order-1" variants={containerVariants}>
          {/* Mobile stacked layout */}
          <motion.div
            className="flex flex-col gap-4 sm:gap-6 sm:hidden"
            variants={containerVariants}
          >
            {blocks.map((block, idx) => (
              <motion.div key={idx} variants={cardVariants}>
                <div
                  className={`w-[90%] mx-auto h-24 sm:h-28 md:h-32 flex flex-col items-center justify-center text-center p-3 sm:p-4 rounded-md shadow-md relative transition-transform duration-200 hover:scale-105 ${block.bgColor && block.bgColor.startsWith('bg-') ? block.bgColor : ''}`}
                  style={
                    block.bgColor
                      ? !block.bgColor.startsWith('bg-')
                        ? { backgroundColor: block.bgColor }
                        : undefined
                      : { backgroundColor: '#DDEB9D' }
                  }
                >
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                  <div className="relative z-10 text-white">
                    {block.icon && (
                      <div className="mb-1 sm:mb-2 inline-block">
                        {typeof block.icon === 'string' ? (
                          <Image
                            src={block.icon}
                            alt={block.label}
                            width={24}
                            height={24}
                            className="w-6 h-6 sm:w-8 sm:h-8"
                          />
                        ) : (
                          <Image
                            src={block.icon.url}
                            alt={block.label}
                            width={24}
                            height={24}
                            className="w-6 h-6 sm:w-8 sm:h-8"
                          />
                        )}
                      </div>
                    )}
                    <div className="text-lg sm:text-xl font-bold font-sansita">{block.value}</div>
                    <div className="text-xs font-semibold opacity-90 font-fira-sans">
                      {block.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-4xl hidden sm:grid"
            variants={containerVariants}
            viewport={{ once: false, amount: 0.2 }}
          >
            {/* Card 1: Large, top left (aligned right) */}
            <div className="flex justify-end">
              {blocks[0] && (
                <motion.div variants={cardVariants}>
                  <div
                    className={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 flex flex-col items-center justify-center text-center p-3 sm:p-4 md:p-6 overflow-hidden relative transition-transform duration-200 hover:scale-105 ${blocks[0].bgColor && blocks[0].bgColor.startsWith('bg-') ? blocks[0].bgColor : ''}`}
                    style={
                      blocks[0].bgColor && !blocks[0].bgColor.startsWith('bg-')
                        ? { backgroundColor: blocks[0].bgColor }
                        : undefined
                    }
                  >
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                    <div className="relative z-10 text-white">
                      {blocks[0].icon && (
                        <div className="mb-2 sm:mb-3 inline-block">
                          {typeof blocks[0].icon === 'string' ? (
                            <Image
                              src={blocks[0].icon}
                              alt={blocks[0].label}
                              width={64}
                              height={64}
                              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                            />
                          ) : (
                            <Image
                              src={blocks[0].icon.url}
                              alt={blocks[0].label}
                              width={64}
                              height={64}
                              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                            />
                          )}
                        </div>
                      )}
                      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-sansita">
                        {blocks[0].value}
                      </div>
                      <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold opacity-90 font-fira-sans">
                        {blocks[0].label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            {/* Card 2: Medium, top right (aligned left and bottom) */}
            <div className="flex justify-start items-end">
              {blocks[1] && (
                <motion.div variants={cardVariants}>
                  <div
                    className={`w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex flex-col items-center justify-center text-center p-2 sm:p-3 md:p-6 overflow-hidden relative transition-transform duration-200 hover:scale-105 ${blocks[1].bgColor && blocks[1].bgColor.startsWith('bg-') ? blocks[1].bgColor : ''}`}
                    style={
                      blocks[1].bgColor && !blocks[1].bgColor.startsWith('bg-')
                        ? { backgroundColor: blocks[1].bgColor }
                        : undefined
                    }
                  >
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="relative z-10 text-white">
                      {blocks[1].icon && (
                        <div className="mb-2 sm:mb-3 inline-block">
                          {typeof blocks[1].icon === 'string' ? (
                            <Image
                              src={blocks[1].icon}
                              alt={blocks[1].label}
                              width={48}
                              height={48}
                              className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-18 lg:h-18"
                            />
                          ) : (
                            <Image
                              src={blocks[1].icon.url}
                              alt={blocks[1].label}
                              width={48}
                              height={48}
                              className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-18 lg:h-18"
                            />
                          )}
                        </div>
                      )}
                      <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-3xl font-bold font-sansita">
                        {blocks[1].value}
                      </div>
                      <div className="text-xs sm:text-xs md:text-sm lg:text-base font-semibold opacity-90 font-fira-sans">
                        {blocks[1].label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            {/* Card 3: Small, bottom left (aligned right) */}
            <div className="flex justify-end">
              {blocks[2] && (
                <motion.div variants={cardVariants}>
                  <div
                    className={`w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex flex-col items-center justify-center text-center p-2 sm:p-3 md:p-6 overflow-hidden relative transition-transform duration-200 hover:scale-105 ${blocks[2].bgColor && blocks[2].bgColor.startsWith('bg-') ? blocks[2].bgColor : ''}`}
                    style={
                      blocks[2].bgColor && !blocks[2].bgColor.startsWith('bg-')
                        ? { backgroundColor: blocks[2].bgColor }
                        : undefined
                    }
                  >
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="relative z-10 text-white">
                      {blocks[2].icon && (
                        <div className="mb-1 sm:mb-2 inline-block">
                          {typeof blocks[2].icon === 'string' ? (
                            <Image
                              src={blocks[2].icon}
                              alt={blocks[2].label}
                              width={40}
                              height={40}
                              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
                            />
                          ) : (
                            <Image
                              src={blocks[2].icon.url}
                              alt={blocks[2].label}
                              width={40}
                              height={40}
                              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
                            />
                          )}
                        </div>
                      )}
                      <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold font-sansita">
                        {blocks[2].value}
                      </div>
                      <div className="text-xs sm:text-xs md:text-sm lg:text-base font-semibold opacity-90 font-fira-sans">
                        {blocks[2].label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            {/* Card 4: Large, bottom right (aligned left) */}
            <div className="flex justify-start">
              {blocks[3] && (
                <motion.div variants={cardVariants}>
                  <div
                    className={`w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-72 xl:h-72 flex flex-col items-center justify-center text-center p-3 sm:p-4 md:p-6 overflow-hidden relative transition-transform duration-200 hover:scale-105 ${blocks[3].bgColor && blocks[3].bgColor.startsWith('bg-') ? blocks[3].bgColor : ''}`}
                    style={
                      blocks[3].bgColor && !blocks[3].bgColor.startsWith('bg-')
                        ? { backgroundColor: blocks[3].bgColor }
                        : undefined
                    }
                  >
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="relative z-10 text-white">
                      {blocks[3].icon && (
                        <div className="mb-2 sm:mb-3 inline-block">
                          {typeof blocks[3].icon === 'string' ? (
                            <Image
                              src={blocks[3].icon}
                              alt={blocks[3].label}
                              width={64}
                              height={64}
                              className="w-10 h-10 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20"
                            />
                          ) : (
                            <Image
                              src={blocks[3].icon.url}
                              alt={blocks[3].label}
                              width={64}
                              height={64}
                              className="w-10 h-10 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20"
                            />
                          )}
                        </div>
                      )}
                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold font-sansita">
                        {blocks[3].value}
                      </div>
                      <div className="text-xs sm:text-xs md:text-sm lg:text-base font-semibold opacity-90 font-fira-sans">
                        {blocks[3].label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
        {/* Right: Text content */}
        <motion.div
          className="flex-1 flex flex-col justify-center mt-8 sm:mt-10 lg:mt-0 order-1 lg:order-2"
          variants={textColVariants}
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="flex items-center space-x-2 mb-2 sm:mb-3">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-orange-500 inline-block" />
            <span className="uppercase text-xs sm:text-sm font-bold tracking-wider text-gray-600">
              {sectionLabel}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-5 leading-tight">
            {heading}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8">
            {description}
          </p>

          {/* Button - Always links to learn-more page */}
          {buttonText ? (
            <Link
              href="/learn-more"
              className="inline-block self-start bg-mainBlue hover:bg-blue-800 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg text-sm sm:text-base lg:text-lg"
            >
              {buttonText}
            </Link>
          ) : showLearnMoreButton ? (
            <Link
              href="/learn-more"
              className="inline-block self-start bg-mainBlue hover:bg-blue-800 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg text-sm sm:text-base lg:text-lg"
            >
              Learn More
            </Link>
          ) : null}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HomePageImpact
