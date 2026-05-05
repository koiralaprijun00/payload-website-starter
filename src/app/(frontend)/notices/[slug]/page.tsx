import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { notFound } from 'next/navigation'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

async function getNotice(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const req = await payload.find({
    collection: 'notices',
    where: { slug: { equals: slug } },
    draft: false,
  })
  return req.docs?.[0] || null
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const notice = await getNotice(slug)
  if (!notice) {
    return notFound()
  }
  return (
    <div className="container mx-auto py-8 lg:py-12">
      <h1 className="mb-4 text-4xl font-bold text-mainBlue">{notice.title}</h1>
      <p className="mb-6 text-sm text-gray-500 uppercase font-semibold">
        {(notice.categories ?? [])
          .map((c) => (typeof c === 'object' && c !== null ? (c as { title?: string }).title : ''))
          .filter(Boolean)
          .join(', ')}
      </p>
      {notice.image && typeof notice.image === 'object' && (
        <div className="mb-6 aspect-[16/9] relative border bg-gray-100">
          <Media resource={notice.image} fill imgClassName="object-cover" />
        </div>
      )}
      {notice.content && <RichText data={notice.content} />}
    </div>
  )
}
