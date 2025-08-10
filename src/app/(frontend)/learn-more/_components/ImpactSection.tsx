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
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="max-w-3xl mb-10">
        {sectionLabel && (
          <div className="uppercase text-lg md:text-xl font-semibold tracking-wide text-blue-700 mb-3">
            {sectionLabel}
          </div>
        )}
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{heading}</h2>
        )}
        {description && <p className="text-gray-700 text-lg">{description}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blocks?.map((block, idx) => {
          const iconUrl = resolveIconUrl(block.icon)
          const bgClass =
            block.bgColor && block.bgColor.startsWith('bg-') ? block.bgColor : 'bg-blue-900'
          return (
            <div
              key={idx}
              className={`rounded-lg p-5 text-white shadow-sm ${bgClass}`}
              style={
                !block.bgColor || block.bgColor.startsWith('bg-')
                  ? undefined
                  : { backgroundColor: block.bgColor }
              }
            >
              {iconUrl && (
                <div className="mb-3">
                  <Image src={iconUrl} alt={block.label || 'Impact icon'} width={40} height={40} />
                </div>
              )}
              <div className="text-2xl font-bold">{block.value || ''}</div>
              <div className="text-sm opacity-90">{block.label || ''}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
