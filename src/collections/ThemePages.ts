import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { defaultLexical } from '@/fields/defaultLexical'

export const ThemePages: CollectionConfig = {
  slug: 'theme-pages',
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
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'introSection',
      label: 'Intro Section',
      type: 'group',
      fields: [
        {
          name: 'tagline',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
        },
        {
          name: 'factBox',
          label: 'Fact Box',
          type: 'group',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Did you know?',
            },
            {
              name: 'fact',
              type: 'text',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'statValue',
              label: 'Stat Value',
              type: 'text',
              required: false,
            },
            {
              name: 'statLabel',
              label: 'Stat Label',
              type: 'text',
              required: false,
            },
          ],
        },
      ],
    },
    {
      name: 'mainContent',
      label: 'Main Content',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          editor: defaultLexical,
        },
      ],
    },
    {
      name: 'contentImage',
      label: 'Content Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
