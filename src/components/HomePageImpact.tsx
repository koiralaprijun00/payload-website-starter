import React from 'react'
import Image from 'next/image'
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
  buttonLink?: string
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
  blocks,
}) => {
  return (
    <motion.section
      className="w-full max-w-7xl mx-auto px-4 py-16 my-16 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        {/* Left: Custom grid layout */}
        <motion.div className="flex-1 order-2 lg:order-1" variants={containerVariants}>
          {/* Mobile stacked layout */}
          <motion.div className="flex flex-col gap-4 sm:hidden" variants={containerVariants}>
            {blocks.map((block, idx) => (
              <motion.div key={idx} variants={cardVariants}>
                <div
                  className={`w-[90%] mx-auto h-32 flex flex-col items-center justify-center text-center p-4 rounded-md shadow-md relative transition-transform duration-200 hover:scale-105 ${block.bgColor && block.bgColor.startsWith('bg-') ? block.bgColor : ''}`}
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
                      <div className="mb-2 inline-block">
                        {typeof block.icon === 'string' ? (
                          <Image src={block.icon} alt={block.label} width={32} height={32} />
                        ) : (
                          <Image src={block.icon.url} alt={block.label} width={32} height={32} />
                        )}
                      </div>
                    )}
                    <div className="text-xl font-bold font-sansita">{block.value}</div>
                    <div className="text-xs font-semibold opacity-90 font-fira-sans">
                      {block.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="grid-cols-2 gap-6 max-w-4xl hidden sm:grid"
            variants={containerVariants}
            viewport={{ once: false, amount: 0.2 }}
          >
            {/* Card 1: Large, top left (aligned right) */}
            <div className="flex justify-end">
              {blocks[0] && (
                <motion.div variants={cardVariants}>
                  <div
                    className={`w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex flex-col items-center justify-center text-center p-4 sm:p-6 overflow-hidden relative transition-transform duration-200 hover:scale-105 ${blocks[0].bgColor && blocks[0].bgColor.startsWith('bg-') ? blocks[0].bgColor : ''}`}
                    style={
                      blocks[0].bgColor && !blocks[0].bgColor.startsWith('bg-')
                        ? { backgroundColor: blocks[0].bgColor }
                        : undefined
                    }
                  >
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                    <div className="relative z-10 text-white">
                      {blocks[0].icon && (
                        <div className="mb-3 inline-block">
                          {typeof blocks[0].icon === 'string' ? (
                            <Image
                              src={blocks[0].icon}
                              alt={blocks[0].label}
                              width={96}
                              height={96}
                            />
                          ) : (
                            <Image
                              src={blocks[0].icon.url}
                              alt={blocks[0].label}
                              width={96}
                              height={96}
                            />
                          )}
                        </div>
                      )}
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-sansita">
                        {blocks[0].value}
                      </div>
                      <div className="text-xs sm:text-base md:text-lg font-semibold opacity-90 font-fira-sans">
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
                    className={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex flex-col items-center justify-center text-center p-3 sm:p-6 overflow-hidden relative transition-transform duration-200 hover:scale-105 ${blocks[1].bgColor && blocks[1].bgColor.startsWith('bg-') ? blocks[1].bgColor : ''}`}
                    style={
                      blocks[1].bgColor && !blocks[1].bgColor.startsWith('bg-')
                        ? { backgroundColor: blocks[1].bgColor }
                        : undefined
                    }
                  >
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="relative z-10 text-white">
                      {blocks[1].icon && (
                        <div className="mb-3 inline-block">
                          {typeof blocks[1].icon === 'string' ? (
                            <Image
                              src={blocks[1].icon}
                              alt={blocks[1].label}
                              width={72}
                              height={72}
                            />
                          ) : (
                            <Image
                              src={blocks[1].icon.url}
                              alt={blocks[1].label}
                              width={72}
                              height={72}
                            />
                          )}
                        </div>
                      )}
                      <div className="text-lg sm:text-xl md:text-3xl font-bold font-sansita">
                        {blocks[1].value}
                      </div>
                      <div className="text-xs sm:text-sm md:text-base font-semibold opacity-90 font-fira-sans">
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
                    className={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex flex-col items-center justify-center text-center p-3 sm:p-6 overflow-hidden relative transition-transform duration-200 hover:scale-105 ${blocks[2].bgColor && blocks[2].bgColor.startsWith('bg-') ? blocks[2].bgColor : ''}`}
                    style={
                      blocks[2].bgColor && !blocks[2].bgColor.startsWith('bg-')
                        ? { backgroundColor: blocks[2].bgColor }
                        : undefined
                    }
                  >
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="relative z-10 text-white">
                      {blocks[2].icon && (
                        <div className="mb-2 inline-block">
                          {typeof blocks[2].icon === 'string' ? (
                            <Image
                              src={blocks[2].icon}
                              alt={blocks[2].label}
                              width={64}
                              height={64}
                            />
                          ) : (
                            <Image
                              src={blocks[2].icon.url}
                              alt={blocks[2].label}
                              width={64}
                              height={64}
                            />
                          )}
                        </div>
                      )}
                      <div className="text-base sm:text-lg md:text-2xl font-bold font-sansita">
                        {blocks[2].value}
                      </div>
                      <div className="text-xs sm:text-xs md:text-sm font-semibold opacity-90 font-fira-sans">
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
                    className={`w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 flex flex-col items-center justify-center text-center p-4 sm:p-6 overflow-hidden relative transition-transform duration-200 hover:scale-105 ${blocks[3].bgColor && blocks[3].bgColor.startsWith('bg-') ? blocks[3].bgColor : ''}`}
                    style={
                      blocks[3].bgColor && !blocks[3].bgColor.startsWith('bg-')
                        ? { backgroundColor: blocks[3].bgColor }
                        : undefined
                    }
                  >
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="relative z-10 text-white">
                      {blocks[3].icon && (
                        <div className="mb-3 inline-block">
                          {typeof blocks[3].icon === 'string' ? (
                            <Image
                              src={blocks[3].icon}
                              alt={blocks[3].label}
                              width={80}
                              height={80}
                            />
                          ) : (
                            <Image
                              src={blocks[3].icon.url}
                              alt={blocks[3].label}
                              width={80}
                              height={80}
                            />
                          )}
                        </div>
                      )}
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold font-sansita">
                        {blocks[3].value}
                      </div>
                      <div className="text-xs sm:text-base md:text-base font-semibold opacity-90 font-fira-sans">
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
          className="flex-1 flex flex-col justify-center mt-10 lg:mt-0 order-1 lg:order-2"
          variants={textColVariants}
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="flex items-center space-x-2 mb-3">
            <span className="h-2 w-2 bg-orange-500 inline-block" />
            <span className="uppercase text-sm font-bold tracking-wider text-gray-600">
              {sectionLabel}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            {heading}
          </h2>
          <p className="text-lg text-gray-700 mb-8">{description}</p>
          {/* Button hidden for now. Uncomment to re-enable:
          {buttonText && buttonLink && (
            <a
              href={buttonLink}
              className="inline-block self-start bg-green-200 hover:bg-green-300 text-green-800 font-bold px-8 py-3 transition-colors duration-300"
            >
              {buttonText}
            </a>
          )}
          */}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HomePageImpact
