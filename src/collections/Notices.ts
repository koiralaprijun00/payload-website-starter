import { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { featureRichText } from '@/fields/lexical-editor'
import { slugField } from '@/fields/slug'

const categoryOptions = [
  { label: 'Ecosystem', value: 'ecosystem' },
  { label: 'Species', value: 'species' },
  { label: 'Community', value: 'community' },
  { label: 'Policy', value: 'policy' },
]

const Notices: CollectionConfig = {
  slug: 'notices',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['category', 'title', 'publishedAt'],
  },
  access: {
    read: anyone,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    ...slugField(),
    {
      name: 'category',
      type: 'select',
      required: true,
      options: categoryOptions,
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
      editor: featureRichText,
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
