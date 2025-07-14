import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: 'Home Page',
    plural: 'Home Page',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
            {
              name: 'conservationSection',
              type: 'group',
              label: 'Conservation Section',
              fields: [
                { name: 'sectionHeading', type: 'text', label: 'Section Heading' },
                { name: 'sectionDescription', type: 'textarea', label: 'Section Description' },
                { name: 'buttonText', type: 'text', label: 'Button Text' },
                { name: 'buttonLink', type: 'text', label: 'Button Link' },
                {
                  name: 'tabs',
                  type: 'array',
                  label: 'Tabs',
                  fields: [
                    { name: 'label', type: 'text', label: 'Tab Label' },
                    { name: 'title', type: 'text', label: 'Tab Title' },
                    { name: 'text', type: 'textarea', label: 'Tab Text' },
                    {
                      name: 'link',
                      type: 'select',
                      label: 'Theme Page',
                      options: [
                        { label: 'Ecosystem', value: '/ecosystem' },
                        { label: 'Community', value: '/community' },
                        { label: 'Research', value: '/research' },
                        { label: 'Species', value: '/species' },
                      ],
                      required: true,
                    },
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Tab Image',
                    },
                  ],
                  minRows: 1,
                  maxRows: 10,
                },
              ],
            },
            {
              name: 'homePageProjects',
              type: 'group',
              label: 'Home Page Projects',
              fields: [
                { name: 'sectionLabel', type: 'text', label: 'Section Label' },
                { name: 'heading', type: 'text', label: 'Heading' },
                { name: 'subheading', type: 'textarea', label: 'Subheading' },
                {
                  name: 'blocks',
                  type: 'array',
                  label: 'Project Blocks',
                  fields: [
                    { name: 'title', type: 'text', label: 'Title' },
                    { name: 'description', type: 'textarea', label: 'Description' },
                    { name: 'value', type: 'text', label: 'Value' },
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Image',
                    },
                    {
                      name: 'bgColor',
                      type: 'text',
                      label: 'Background Color (Tailwind class, e.g. bg-blue-900)',
                      required: false,
                    },
                    {
                      name: 'link',
                      label: 'Project Page',
                      type: 'relationship',
                      relationTo: 'projects',
                      required: false,
                    },
                  ],
                  minRows: 1,
                  maxRows: 12,
                },
              ],
            },
            {
              name: 'homePageImpact',
              type: 'group',
              label: 'Home Page Impact',
              fields: [
                { name: 'sectionLabel', type: 'text', label: 'Section Label' },
                { name: 'heading', type: 'text', label: 'Heading' },
                { name: 'description', type: 'textarea', label: 'Description' },
                { name: 'buttonText', type: 'text', label: 'Button Text' },
                { name: 'buttonLink', type: 'text', label: 'Button Link' },
                {
                  name: 'blocks',
                  type: 'array',
                  label: 'Impact Blocks',
                  fields: [
                    { name: 'icon', type: 'upload', relationTo: 'media', label: 'Icon/Image' },
                    { name: 'value', type: 'text', label: 'Value' },
                    { name: 'label', type: 'text', label: 'Label' },
                    {
                      name: 'bgColor',
                      type: 'select',
                      label: 'Background Color',
                      options: [
                        { label: 'Blue', value: 'bg-blue-900' },
                        { label: 'Green', value: 'bg-green-700' },
                        { label: 'Yellow', value: 'bg-yellow-400' },
                        { label: 'Orange', value: 'bg-orange-500' },
                        { label: 'Gray', value: 'bg-gray-700' },
                      ],
                      defaultValue: 'bg-blue-900',
                      required: true,
                    },
                  ],
                  minRows: 1,
                  maxRows: 8,
                },
              ],
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
