import { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'
import { anyone } from '../access/anyone'

const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: anyone,
  },
  hooks: {
    afterChange: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info(`Revalidating team pages and individual member page`)
          revalidatePath('/executive-team')
          revalidatePath('/staff')
          revalidatePath('/alumni')
          // Revalidate the individual team member page
          revalidatePath(`/team-members/${doc.slug}`)
        }
        return doc
      },
    ],
    afterDelete: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info(`Revalidating team pages after delete`)
          revalidatePath('/executive-team')
          revalidatePath('/staff')
          revalidatePath('/alumni')
          // Revalidate the individual team member page
          revalidatePath(`/team-members/${doc.slug}`)
        }
        return doc
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true },
    { name: 'profileImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    {
      name: 'boardType',
      type: 'select',
      options: [
        { label: 'Executive Team', value: 'executive' },
        { label: 'Staff', value: 'staff' },
        { label: 'Alumni', value: 'alumni' },
      ],
      required: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      required: false,
      admin: {
        description: 'Lower numbers appear first. Leave empty to sort alphabetically by name.',
      },
    },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea', required: false },
    // Add more fields as needed (bio, etc.)
  ],
}

export default TeamMembers
