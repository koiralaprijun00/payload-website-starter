import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

export type RawIcon =
  | string
  | {
      url?: string | null
      filename?: string | null
    }
  | Media
  | null
  | undefined

export interface RawImpactBlock {
  icon?: RawIcon
  value?: string
  label?: string
  bgColor?: string
}

interface ImpactSectionProps {
  sectionLabel: string
  heading: string
  description: string
  blocks: RawImpactBlock[]
}

function resolveIconUrl(icon?: RawIcon): string | undefined {
  if (!icon) return undefined
  if (typeof icon === 'string') return icon
  if (typeof icon === 'object') {
    // Media or partial objects
    const anyIcon = icon as { url?: string | null; filename?: string | null }
    if (anyIcon.url && typeof anyIcon.url === 'string') return anyIcon.url
    if (anyIcon.filename && typeof anyIcon.filename === 'string')
      return `/media/${anyIcon.filename}`
  }
  return undefined
}

export default function ImpactSection({
  sectionLabel,
  heading,
  description,
  blocks,
}: ImpactSectionProps) {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="max-w-3xl mb-8 sm:mb-10 lg:mb-12">
        {sectionLabel && (
          <div className="uppercase text-base sm:text-lg md:text-xl lg:text-2xl font-semibold tracking-wide text-blue-700 mb-2 sm:mb-3">
            {sectionLabel}
          </div>
        )}
        {heading && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-4">
            {heading}
          </h2>
        )}
        {description && (
          <p className="text-gray-700 text-base sm:text-lg lg:text-xl">{description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {blocks?.map((block, idx) => {
          const iconUrl = resolveIconUrl(block.icon)
          const bgClass =
            block.bgColor && block.bgColor.startsWith('bg-') ? block.bgColor : 'bg-blue-900'
          return (
            <div
              key={idx}
              className={`rounded-lg p-4 sm:p-5 lg:p-6 text-white shadow-sm ${bgClass}`}
              style={
                !block.bgColor || block.bgColor.startsWith('bg-')
                  ? undefined
                  : { backgroundColor: block.bgColor }
              }
            >
              {iconUrl && (
                <div className="mb-2 sm:mb-3">
                  <Image
                    src={iconUrl}
                    alt={block.label || 'Impact icon'}
                    width={32}
                    height={32}
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  />
                </div>
              )}
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{block.value || ''}</div>
              <div className="text-xs sm:text-sm lg:text-base opacity-90">{block.label || ''}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
