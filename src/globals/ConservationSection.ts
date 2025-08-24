import type { GlobalConfig } from 'payload'
import { anyone } from '../access/anyone'

const ConservationSection: GlobalConfig = {
  slug: 'conservation-section',
  label: 'Conservation Section Settings',
  admin: {
    description: 'Manage the settings for the Conservation Section that appears on pages',
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'pillLabel',
      type: 'text',
      label: 'Pill Label',
      required: true,
      defaultValue: 'OUR PROGRAMMES',
      admin: {
        description: 'The label that appears in the orange pill above the section heading (e.g., "OUR PROGRAMMES", "OUR THEMES")',
      },
    },
    {
      name: 'defaultSectionHeading',
      type: 'text',
      label: 'Default Section Heading',
      required: false,
      admin: {
        description: 'Default heading for the conservation section if not specified on individual pages',
      },
    },
    {
      name: 'defaultSectionDescription',
      type: 'textarea',
      label: 'Default Section Description',
      required: false,
      admin: {
        description: 'Default description for the conservation section if not specified on individual pages',
      },
    },
  ],
}

export default ConservationSection
