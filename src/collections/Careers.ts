import { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

const Careers: CollectionConfig = {
  slug: 'careers',
  labels: {
    singular: 'Career Position',
    plural: 'Career Positions',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'deadline'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    afterChange: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info(`Revalidating careers page`)
          revalidatePath('/careers')
        }
        return doc
      },
    ],
    afterDelete: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info(`Revalidating careers page after delete`)
          revalidatePath('/careers')
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
      label: 'Job Title',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'open',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        description: 'Whether this position is currently accepting applications',
      },
    },
    {
      name: 'deadline',
      type: 'date',
      label: 'Application Deadline',
      required: false,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'When applications close for this position',
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      required: false,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Employment Type',
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
        { label: 'Internship', value: 'internship' },
        { label: 'Volunteer', value: 'volunteer' },
      ],
      required: false,
    },
    {
      name: 'experience',
      type: 'text',
      label: 'Experience Required',
      required: false,
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Job Summary',
      required: false,
      admin: {
        description: 'Brief description shown in the listing',
      },
    },
    {
      name: 'applicationEmail',
      type: 'email',
      label: 'Application Email',
      required: false,
      admin: {
        description: 'Email where applications should be sent',
      },
    },
    {
      name: 'applicationInstructions',
      type: 'textarea',
      label: 'Application Instructions',
      required: false,
      admin: {
        description: 'Special instructions for applicants',
      },
    },
  ],
}

export default Careers
