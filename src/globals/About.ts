import { GlobalConfig } from 'payload'
import { anyone } from '../access/anyone'
import { featureRichText } from '../fields/lexical-editor'

const About: GlobalConfig = {
  slug: 'about-page',
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      name: 'featuresGrid',
      type: 'blocks',
      required: true,
      blocks: [
        {
          slug: 'imageCard',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            { name: 'alt', type: 'text' },
          ],
        },
        {
          slug: 'iconCard',
          fields: [
            { name: 'icon', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      name: 'detailedContent',
      type: 'richText',
      editor: featureRichText,
      required: true,
    },
    {
      name: 'volunteerCta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'buttonText', type: 'text', required: true },
        { name: 'buttonLink', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      name: 'teamSectionTitle',
      type: 'text',
      required: true,
    },
  ],
}

export default About
