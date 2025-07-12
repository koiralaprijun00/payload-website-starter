import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { GalleryImage, Media } from '@/payload-types'

function getImageUrl(image: string | Media | null | undefined): string {
  if (!image) return ''
  if (typeof image === 'string') return image
  if ('url' in image && typeof image.url === 'string') return image.url
  return ''
}

export async function getGalleryImages() {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'gallery-images',
    depth: 1,
    limit: 100, // adjust as needed
    sort: '-createdAt',
  })
  return res.docs.map((doc: GalleryImage) => ({
    id: doc.id,
    image: getImageUrl(doc.image),
    title: doc.title,
    description: doc.description,
    tags: doc.tags,
  }))
}
