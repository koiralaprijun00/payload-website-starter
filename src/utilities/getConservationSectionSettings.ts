import type { Config } from 'src/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type ConservationSectionGlobal = Config['globals']['conservation-section']

async function getConservationSectionSettings(depth = 0): Promise<ConservationSectionGlobal> {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug: 'conservation-section',
    depth,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the conservation section
 */
export const getCachedConservationSectionSettings = unstable_cache(
  getConservationSectionSettings,
  ['conservation-section'],
  {
    tags: ['conservation-section'],
    revalidate: 3600, // Revalidate every hour
  },
)
