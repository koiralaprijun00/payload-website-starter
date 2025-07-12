import { CollectionConfig } from 'payload/types'

const Publications: CollectionConfig = {
  slug: 'publications',
  labels: {
    singular: 'Publication',
    plural: 'Publications',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'month', 'year'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'summary',
      type: 'textarea',
      required: false,
      label: 'Summary',
    },
    {
      name: 'document',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Document (PDF, DOCX, etc.)',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: false,
      label: 'Category',
    },
    {
      name: 'month',
      type: 'select',
      label: 'Month',
      required: false,
      options: [
        { label: 'January', value: 'January' },
        { label: 'February', value: 'February' },
        { label: 'March', value: 'March' },
        { label: 'April', value: 'April' },
        { label: 'May', value: 'May' },
        { label: 'June', value: 'June' },
        { label: 'July', value: 'July' },
        { label: 'August', value: 'August' },
        { label: 'September', value: 'September' },
        { label: 'October', value: 'October' },
        { label: 'November', value: 'November' },
        { label: 'December', value: 'December' },
      ],
    },
    {
      name: 'year',
      type: 'number',
      label: 'Year',
      required: false,
      min: 1900,
      max: 2100,
    },
  ],
}

export default Publications
