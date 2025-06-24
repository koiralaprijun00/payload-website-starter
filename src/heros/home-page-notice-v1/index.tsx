'use client'

import React, { useEffect, useState } from 'react'
import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { getClientSideURL } from '@/utilities/getURL'
import { useHeaderTheme } from '@/providers/HeaderTheme'

interface Notice {
  id: string
  category: string
  title: string
  summary: string
  image?: any
  slug?: string
}

const categoryLabel: Record<string, string> = {
  ecosystem: 'Ecosystem',
  species: 'Species',
  community: 'Community',
  policy: 'Policy',
}

export const HomePageNoticeV1Hero: React.FC<Page['hero']> = ({
  media,
  category,
  title,
  description,
  buttonLink,
  buttonText,
}) => {
  const [notices, setNotices] = useState<Notice[]>([])
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme(null)
  }, [setHeaderTheme])

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch(`${getClientSideURL()}/api/notices?limit=4&sort=-publishedAt`)
        const json = await res.json()
        setNotices(json?.docs || [])
      } catch (err) {
        console.error(err)
      }
    }

    fetchNotices()
  }, [])

  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 lg:py-12">
      {/* Left Image Section */}
      <div className="lg:col-span-8">
        {media && typeof media === 'object' && (
          <div className="aspect-[16/9] relative border-8 border-white">
            <Media resource={media} fill imgClassName="object-cover" />
          </div>
        )}
        {(title || description) && (
          <div className="mt-4 bg-mainBlue text-white p-6">
            {title && <h2 className="text-3xl lg:text-4xl font-bold">{title}</h2>}
            {description && <p className="mt-2 text-lg lg:text-xl">{description}</p>}
            {buttonLink && buttonText && (
              <CMSLink
                className="inline-block mt-4 underline"
                url={buttonLink}
                label={buttonText}
              />
            )}
          </div>
        )}
      </div>

      {/* Right Notices Section */}
      <aside className="lg:col-span-4">
        <h3 className="mb-4 flex items-center text-xl font-semibold">
          <span className="mr-2 inline-block h-3 w-3 rounded-full bg-[#F15A24]" /> Notices
        </h3>
        <ul className="space-y-6">
          {notices.map((notice) => (
            <li key={notice.id} className="border-t first:border-none pt-6 first:pt-0 flex gap-4">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  {categoryLabel[notice.category] || notice.category}
                </p>
                <CMSLink
                  url={`/notices/${notice.slug || notice.id}`}
                  label={notice.title}
                  className="mt-1 line-clamp-3 font-medium text-mainBlue hover:underline"
                />
              </div>
              {notice.image && typeof notice.image === 'object' && (
                <div className="w-16 h-16 flex-shrink-0 border bg-gray-100 relative">
                  <Media resource={notice.image} fill imgClassName="object-cover" />
                </div>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
