import { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'

const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: anyone,
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
        { label: 'Advisory Board', value: 'advisory' },
        { label: 'Executive Board', value: 'executive' },
      ],
      required: true,
    },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea', required: false },
    // Add more fields as needed (bio, etc.)
  ],
}

export default TeamMembers
