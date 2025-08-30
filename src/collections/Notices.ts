import { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { comprehensiveLexical } from '@/fields/comprehensiveLexical'
import { slugField } from '@/fields/slug'
import { revalidatePath } from 'next/cache'

const Notices: CollectionConfig = {
  slug: 'notices',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['categories', 'title', 'publishedAt'],
  },
  access: {
    read: anyone,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info(`Revalidating notice: ${doc.slug}`)
          revalidatePath(`/notices/${doc.slug}`)
          revalidatePath('/notices')
          // Revalidate theme pages that might display this notice
          revalidatePath('/themes/[slug]', 'page')
        }
        return doc
      },
    ],
    afterDelete: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info(`Revalidating notice after delete: ${doc.slug}`)
          revalidatePath(`/notices/${doc.slug}`)
          revalidatePath('/notices')
          // Revalidate theme pages that might display this notice
          revalidatePath('/themes/[slug]', 'page')
        }
        return doc
      },
    ],
  },
  fields: [
    ...slugField(),
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      required: true,
      admin: {
        allowCreate: false,
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      editor: comprehensiveLexical,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
      required: true,
    },
  ],
}

export default Notices
