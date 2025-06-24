import type { Block } from 'payload'
import { hero } from './config'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heros',
  },
  fields: (hero as any).fields,
}
