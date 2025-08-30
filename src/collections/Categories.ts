import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info(`Revalidating content pages due to category change`)
          revalidatePath('/publications')
          revalidatePath('/projects')
          revalidatePath('/notices')
          // Revalidate theme pages that might display content with this category
          revalidatePath('/themes/[slug]', 'page')
        }
        return doc
      },
    ],
    afterDelete: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info(`Revalidating content pages due to category delete`)
          revalidatePath('/publications')
          revalidatePath('/projects')
          revalidatePath('/notices')
          // Revalidate theme pages that might display content with this category
          revalidatePath('/themes/[slug]', 'page')
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
}
