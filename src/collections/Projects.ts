import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { comprehensiveLexical } from '@/fields/comprehensiveLexical'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      editor: comprehensiveLexical,
    },
    {
      name: 'themes',
      type: 'relationship',
      relationTo: 'theme-pages',
      hasMany: true,
      required: true,
    },
    {
      name: 'area',
      type: 'select',
      options: ['Bardiya', 'Surkhet', 'Salyan', 'Banke', 'Kailali', 'Dailekh', 'Kathmandu'],
      required: true,
    },
    {
      name: 'year',
      type: 'number',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'completed' },
      ],
      required: true,
    },
  ],
}
