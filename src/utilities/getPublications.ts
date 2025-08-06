import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Media } from '@/payload-types'

export async function getPublications() {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'publications',
    depth: 2, // increase depth to populate category
    limit: 100,
    sort: '-year',
  })
  return res.docs.map((doc: any) => {
    let category = null
    if (doc.category) {
      if (typeof doc.category === 'object' && doc.category !== null) {
        category = {
          id: doc.category.id,
          title: doc.category.title,
        }
      } else if (typeof doc.category === 'string') {
        category = { id: doc.category, title: '' }
      }
    }
    let documentUrl = ''
    if (typeof doc.document === 'object' && doc.document && 'url' in doc.document) {
      documentUrl = (doc.document as Media).url || ''
    } else if (typeof doc.document === 'string') {
      documentUrl = doc.document
    }
    return {
      id: doc.id,
      title: doc.title,
      summary: doc.summary,
      year: doc.year,
      category,
      documentUrl,
    }
  })
}
