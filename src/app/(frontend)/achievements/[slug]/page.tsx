import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import RichText from '@/components/RichText'

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
    <article className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-20">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8">
        {doc.title}
      </h1>
      {heroUrl && (
        <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 mb-6 sm:mb-8">
          <Image src={heroUrl} alt={doc.title} fill className="object-cover rounded-lg" />
        </div>
      )}
      <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none">
        {doc.content ? <RichText data={doc.content} /> : null}
      </div>
    </article>
  )
}
