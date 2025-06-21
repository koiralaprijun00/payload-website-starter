import { CollectionConfig } from 'payload/types'
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
    // Add more fields as needed (bio, email, etc.)
  ],
}

export default TeamMembers
