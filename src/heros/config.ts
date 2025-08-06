import type { Field } from 'payload'

// Unused lexical imports - commented out
// import {
//   FixedToolbarFeature,
//   HeadingFeature,
//   InlineToolbarFeature,
//   lexicalEditor,
// } from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { comprehensiveLexical } from '@/fields/comprehensiveLexical'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Home Page V1',
          value: 'homePageV1',
        },
        {
          label: 'Home Page with Notice Sidebar',
          value: 'homePageNoticeV2',
        },
      ],
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category',
      admin: {
        condition: (_, { type }) => ['homePageV1', 'homePageNoticeV2'].includes(type),
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      admin: {
        condition: (_, { type }) => ['homePageV1', 'homePageNoticeV2'].includes(type),
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        condition: (_, { type }) => ['homePageV1', 'homePageNoticeV2'].includes(type),
      },
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      admin: {
        condition: (_, { type }) => ['homePageV1', 'homePageNoticeV2'].includes(type),
      },
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Button Link',
      admin: {
        condition: (_, { type }) => ['homePageV1', 'homePageNoticeV2'].includes(type),
      },
    },
    {
      name: 'pillLabel',
      type: 'text',
      label: 'Pill Label',
      admin: {
        condition: (_, { type }) => type === 'homePageNoticeV2',
      },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: comprehensiveLexical,
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact', 'homePageV1', 'homePageNoticeV2'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
