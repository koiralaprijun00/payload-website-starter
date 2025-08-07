import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Media } from '@/payload-types'

export async function getPosts() {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'posts',
    depth: 2, // populate heroImage
    limit: 10,
    sort: '-publishedAt',
  })
  return res.docs.map((doc: any) => {
    let heroImage = null
    if (doc.heroImage) {
      if (typeof doc.heroImage === 'object' && doc.heroImage !== null) {
        heroImage = {
          url: (doc.heroImage as Media).url || '',
          alt: (doc.heroImage as Media).alt || '',
        }
      }
    }
    return {
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      heroImage,
      publishedAt: doc.publishedAt,
    }
  })
}
