import type { GlobalConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const LearnMore: GlobalConfig = {
  slug: 'learn-more',
  label: 'Learn More Page',
  admin: {
    description: 'Manage the content for the Learn More page',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info('Revalidating learn more page')
          revalidatePath('/learn-more')
        }
        return doc
      },
    ],
  },
  fields: [
    // Removed hero title/subtitle fields as the top banner is no longer used
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Page Content',
      admin: {
        description:
          'The main content for the Learn More page. Use rich text formatting to style your content.',
      },
    },
  ],
}
