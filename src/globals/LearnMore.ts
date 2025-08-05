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
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
      defaultValue: 'Learn More About Our Impact',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Page Subtitle',
      admin: {
        description: 'Optional subtitle that appears below the main title',
      },
    },
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
