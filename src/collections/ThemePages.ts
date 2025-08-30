import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { comprehensiveLexical } from '@/fields/comprehensiveLexical'
import { revalidatePath } from 'next/cache'

export const ThemePages: CollectionConfig = {
  slug: 'theme-pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info(`Revalidating theme page: ${doc.slug}`)
          revalidatePath(`/themes/${doc.slug}`)
          // Revalidate home page conservation section which displays theme pages
          revalidatePath('/')
        }
        return doc
      },
    ],
    afterDelete: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info(`Revalidating theme page after delete: ${doc.slug}`)
          revalidatePath(`/themes/${doc.slug}`)
          revalidatePath('/')
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
    {
      name: 'programmeCategory',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      required: false,
      admin: {
        description:
          'Select the programme category this theme page represents (e.g., Biodiversity, Livelihood, Climate Change, Capacity Building). This will automatically show related notices and projects.',
      },
    },
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
          editor: comprehensiveLexical,
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
    {
      name: 'relatedContent',
      type: 'group',
      label: 'Related Content Settings',
      fields: [
        {
          name: 'enableRelatedNotices',
          type: 'checkbox',
          label: 'Show Related Notices',
          defaultValue: true,
          admin: {
            description: 'Automatically display notices that match this programme category',
          },
        },
        {
          name: 'noticesHeading',
          type: 'text',
          label: 'Notices Section Heading',
          defaultValue: 'Latest Notices',
          admin: {
            condition: (data) => data.enableRelatedNotices,
          },
        },
        {
          name: 'noticesLimit',
          type: 'number',
          label: 'Number of Notices to Show',
          defaultValue: 6,
          min: 1,
          max: 20,
          admin: {
            condition: (data) => data.enableRelatedNotices,
          },
        },
        {
          name: 'enableRelatedProjects',
          type: 'checkbox',
          label: 'Show Related Projects',
          defaultValue: true,
          admin: {
            description: 'Automatically display projects that match this programme category',
          },
        },
        {
          name: 'projectsHeading',
          type: 'text',
          label: 'Projects Section Heading',
          defaultValue: 'Our Projects',
          admin: {
            condition: (data) => data.enableRelatedProjects,
          },
        },
        {
          name: 'projectsLimit',
          type: 'number',
          label: 'Number of Projects to Show',
          defaultValue: 6,
          min: 1,
          max: 20,
          admin: {
            condition: (data) => data.enableRelatedProjects,
          },
        },
      ],
    },
  ],
}
