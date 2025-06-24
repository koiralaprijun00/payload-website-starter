import { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'

const VolunteerSubmissions: CollectionConfig = {
  slug: 'volunteer-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'createdAt'],
  },
  access: {
    read: ({ req }) => {
      // Only allow admins (authenticated users) to read submissions
      return Boolean(req.user)
    },
    create: anyone,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
    },
  ],
}

export default VolunteerSubmissions
