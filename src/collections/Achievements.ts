import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

export const Achievements: CollectionConfig<'achievements'> = {
  slug: 'achievements',
  labels: {
    singular: 'Achievement Page',
    plural: 'Achievement Pages',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
    {
      name: 'summary',
      type: 'textarea',
      required: false,
      label: 'Short Summary (used on homepage tabs)',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Hero Image',
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Highlights (bullet points)',
      fields: [{ name: 'text', type: 'text', required: true, label: 'Text' }],
    },
    {
      name: 'ctaText',
      type: 'text',
      required: false,
      label: 'CTA Text',
      defaultValue: 'Learn more',
    },
    {
      name: 'ctaLink',
      type: 'text',
      required: false,
      label: 'CTA Link (defaults to this page)',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
    },
  ],
}

export default Achievements
