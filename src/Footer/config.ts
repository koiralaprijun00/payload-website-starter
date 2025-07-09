import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Background image for the footer section. Recommended size: 1920x1080px',
      },
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
    },
    {
      name: 'mission',
      label: 'Mission Statement',
      type: 'textarea',
      required: true,
    },
    {
      name: 'socials',
      label: 'Social Media Links',
      type: 'array',
      fields: [
        {
          name: 'platform',
          label: 'Platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
          ],
          required: true,
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
        },
      ],
      maxRows: 5,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      required: false,
      admin: {
        description: 'Physical address to display in the footer.',
      },
    },
    {
      name: 'donateButton',
      label: 'Donate Button',
      type: 'group',
      fields: [
        {
          name: 'text',
          label: 'Button Text',
          type: 'text',
          required: false,
          defaultValue: 'DONATE NOW',
        },
        {
          name: 'url',
          label: 'Button URL',
          type: 'text',
          required: false,
        },
      ],
      admin: {
        description: 'Text and link for the donate button.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
