import { CollectionConfig } from 'payload/types'

const GalleryImages: CollectionConfig = {
  slug: 'gallery-images',
  labels: {
    singular: 'Gallery Image',
    plural: 'Gallery Images',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['image', 'title', 'tags'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
    },
    {
      name: 'title',
      type: 'text',
      required: false,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      label: 'Description',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      required: false,
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
        },
      ],
    },
  ],
}

export default GalleryImages
