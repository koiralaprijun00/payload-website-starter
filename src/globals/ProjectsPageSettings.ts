import type { GlobalConfig } from 'payload'
import { HeroBlock } from '@/heros/HeroBlock'

const ProjectsPageSettings: GlobalConfig = {
  slug: 'projects-page-settings',
  access: {
    read: () => true,
  },
  fields: [
    // New hero fields for backend editing
    {
      name: 'heroTitle',
      type: 'text',
      label: 'Hero Title',
      required: false,
    },
    {
      name: 'heroSubtitle',
      type: 'text',
      label: 'Hero Subtitle',
      required: false,
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      label: 'Hero Description',
      required: false,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
      required: false,
    },
    // Keep the old hero blocks field for now
    {
      name: 'hero',
      type: 'blocks',
      blocks: [HeroBlock],
      required: false,
    },
  ],
}

export default ProjectsPageSettings
