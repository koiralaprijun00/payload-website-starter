import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Media } from '@/payload-types'

export async function getGalleryMedia(): Promise<
  Array<{ id: string; url: string; alt?: string | null }>
> {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 100,
    sort: '-createdAt',
    where: {
      showInGallery: {
        equals: true,
      },
    },
  })
  return res.docs.map((doc: Media) => ({
    id: doc.id,
    url: doc.url || '',
    alt: doc.alt || '',
  }))
}
