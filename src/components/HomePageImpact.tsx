import React from 'react'
import Image from 'next/image'

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

const HomePageImpact: React.FC<HomePageImpactProps> = ({
  sectionLabel,
  heading,
  description,
  buttonText,
  buttonLink,
  blocks,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        {/* Left: Custom grid layout */}
        <div className="flex-1">
          <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[500px]">
            {/* Block 1: Top left, small */}
            {blocks[0] && (
              <div
                className={`relative flex flex-col items-center justify-center text-center p-6 overflow-hidden`}
                style={{
                  gridColumn: '1 / 2',
                  gridRow: '1 / 2',
                  backgroundColor: '#DDEB9D', // Add to Tailwind config as theme color if desired
                  backgroundImage: blocks[0].bgImage ? `url(${blocks[0].bgImage})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black opacity-30 "></div>
                <div className="relative z-10 text-white">
                  {blocks[0].icon && (
                    <div className="mb-3 inline-block">
                      {typeof blocks[0].icon === 'string' ? (
                        <Image src={blocks[0].icon} alt={blocks[0].label} width={64} height={64} />
                      ) : (
                        <Image
                          src={blocks[0].icon.url}
                          alt={blocks[0].label}
                          width={64}
                          height={64}
                        />
                      )}
                    </div>
                  )}
                  <div className="text-4xl font-bold">{blocks[0].value}</div>
                  <div className="text-lg font-semibold opacity-90">{blocks[0].label}</div>
                </div>
              </div>
            )}
            {/* Block 2: Top right, wide */}
            {blocks[1] && (
              <div
                className={`relative flex flex-col items-center justify-center text-center p-6 overflow-hidden`}
                style={{
                  gridColumn: '2 / 4',
                  gridRow: '1 / 2',
                  backgroundColor: '#143D60', // Add to Tailwind config as theme color if desired
                  backgroundImage: blocks[1].bgImage ? `url(${blocks[1].bgImage})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative z-10 text-white">
                  {blocks[1].icon && (
                    <div className="mb-3 inline-block">
                      {typeof blocks[1].icon === 'string' ? (
                        <Image src={blocks[1].icon} alt={blocks[1].label} width={64} height={64} />
                      ) : (
                        <Image
                          src={blocks[1].icon.url}
                          alt={blocks[1].label}
                          width={64}
                          height={64}
                        />
                      )}
                    </div>
                  )}
                  <div className="text-4xl font-bold">{blocks[1].value}</div>
                  <div className="text-lg font-semibold opacity-90">{blocks[1].label}</div>
                </div>
              </div>
            )}
            {/* Block 3: Bottom left, large */}
            {blocks[2] && (
              <div
                className={`relative flex flex-col items-center justify-center text-center p-6 overflow-hidden`}
                style={{
                  gridColumn: '1 / 3',
                  gridRow: '2 / 3',
                  backgroundColor: '#EB5B00', // Add to Tailwind config as theme color if desired
                  backgroundImage: blocks[2].bgImage ? `url(${blocks[2].bgImage})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black opacity-40 "></div>
                <div className="relative z-10 text-white">
                  {blocks[2].icon && (
                    <div className="mb-3 inline-block">
                      {typeof blocks[2].icon === 'string' ? (
                        <Image src={blocks[2].icon} alt={blocks[2].label} width={64} height={64} />
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
                  <div className="text-4xl font-bold">{blocks[2].value}</div>
                  <div className="text-lg font-semibold opacity-90">{blocks[2].label}</div>
                </div>
              </div>
            )}
            {/* Block 4: Bottom right, medium */}
            {blocks[3] && (
              <div
                className={`relative flex flex-col items-center justify-center text-center p-6 overflow-hidden`}
                style={{
                  gridColumn: '3 / 4',
                  gridRow: '2 / 3',
                  backgroundColor: '#A0C878', // Add to Tailwind config as theme color if desired
                  backgroundImage: blocks[3].bgImage ? `url(${blocks[3].bgImage})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative z-10 text-white">
                  {blocks[3].icon && (
                    <div className="mb-3 inline-block">
                      {typeof blocks[3].icon === 'string' ? (
                        <Image src={blocks[3].icon} alt={blocks[3].label} width={64} height={64} />
                      ) : (
                        <Image
                          src={blocks[3].icon.url}
                          alt={blocks[3].label}
                          width={64}
                          height={64}
                        />
                      )}
                    </div>
                  )}
                  <div className="text-4xl font-bold">{blocks[3].value}</div>
                  <div className="text-lg font-semibold opacity-90">{blocks[3].label}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Right: Text content */}
        <div className="flex-1 flex flex-col justify-center mt-10 lg:mt-0">
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
          {buttonText && buttonLink && (
            <a
              href={buttonLink}
              className="inline-block self-start bg-green-200 hover:bg-green-300 text-green-800 font-bold px-8 py-3 transition-colors duration-300"
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

export default HomePageImpact
