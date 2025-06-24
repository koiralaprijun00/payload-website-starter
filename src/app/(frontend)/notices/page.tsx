import React from 'react'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

async function getNotices() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/notices?limit=100&sort=-publishedAt`,
    {
      cache: 'no-store',
    },
  )
  const json = await res.json()
  return json?.docs || []
}

const categoryLabel: Record<string, string> = {
  ecosystem: 'Ecosystem',
  species: 'Species',
  community: 'Community',
  policy: 'Policy',
}

export default async function NoticesPage() {
  const notices = await getNotices()
  return (
    <div className="container mx-auto py-8 lg:py-12">
      <h1 className="mb-8 text-4xl font-bold text-mainBlue">Notices</h1>
      <ul className="space-y-8">
        {notices.map((notice: any) => (
          <li key={notice.id} className="flex flex-col md:flex-row gap-6 border-b pb-6">
            {notice.image && typeof notice.image === 'object' && (
              <div className="w-full md:w-60 h-40 relative border bg-gray-100 flex-shrink-0">
                <Media resource={notice.image} fill imgClassName="object-cover" />
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm uppercase tracking-wider text-gray-500 font-semibold">
                {categoryLabel[notice.category] || notice.category}
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-mainBlue">
                <CMSLink url={`/notices/${notice.slug || notice.id}`} label={notice.title} />
              </h2>
              <p className="mt-2 text-gray-700 line-clamp-3">{notice.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
