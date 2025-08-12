import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Media } from '@/payload-types'

async function getAchievement(slug: string) {
  const base = process.env.NEXT_PUBLIC_PAYLOAD_URL
  const res = await fetch(`${base}/api/achievements?where[slug][equals]=${slug}&depth=1`, {
    next: { revalidate: 600 },
  })
  if (!res.ok) return null
  const json = await res.json()
  return json.docs?.[0] || null
}

export default async function AchievementPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = await getAchievement(slug)
  if (!doc) return notFound()

  const hero = doc.heroImage as Media | undefined
  const heroUrl = typeof hero === 'object' && hero?.url ? hero.url : undefined

  return (
    <article className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">{doc.title}</h1>
      {heroUrl && (
        <div className="relative w-full h-72 mb-8">
          <Image src={heroUrl} alt={doc.title} fill className="object-cover rounded" />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-danger */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: doc.content?.root ? '' : '' }}
      />
    </article>
  )
}
