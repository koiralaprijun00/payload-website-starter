import { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

const Publications: CollectionConfig = {
  slug: 'publications',
  labels: {
    singular: 'Publication',
    plural: 'Publications',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'month', 'year'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    afterChange: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info(`Revalidating publications page`)
          revalidatePath('/publications')
        }
        return doc
      },
    ],
    afterDelete: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info(`Revalidating publications page after delete`)
          revalidatePath('/publications')
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
      label: 'Title',
    },
    {
      name: 'summary',
      type: 'textarea',
      required: false,
      label: 'Summary',
    },
    {
      name: 'document',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Document (PDF, DOCX, etc.)',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: false,
      label: 'Category',
    },
    // Month field removed - no longer needed
    {
      name: 'year',
      type: 'number',
      label: 'Year',
      required: false,
      min: 1900,
      max: 2100,
    },
  ],
}

export default Publications
