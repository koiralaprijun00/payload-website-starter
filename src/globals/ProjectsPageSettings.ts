import type { GlobalConfig } from 'payload'
import { HeroBlock } from '@/heros/HeroBlock'

const ProjectsPageSettings: GlobalConfig = {
  slug: 'projects-page-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'blocks',
      blocks: [HeroBlock],
      required: true,
    },
  ],
}

export default ProjectsPageSettings
