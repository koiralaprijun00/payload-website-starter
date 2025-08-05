import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { comprehensiveLexical } from '@/fields/comprehensiveLexical'
import { revalidatePath } from 'next/cache'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info(`Revalidating project: ${doc.slug}`)
          revalidatePath(`/projects/${doc.slug}`)
          revalidatePath('/projects')
        }
        return doc
      },
    ],
    afterDelete: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info(`Revalidating project after delete: ${doc.slug}`)
          revalidatePath(`/projects/${doc.slug}`)
          revalidatePath('/projects')
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
    },
    ...slugField(),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      editor: comprehensiveLexical,
    },
    {
      name: 'themes',
      type: 'relationship',
      relationTo: 'theme-pages',
      hasMany: true,
      required: true,
    },
    {
      name: 'area',
      type: 'select',
      options: ['Bardiya', 'Surkhet', 'Salyan', 'Banke', 'Kailali', 'Dailekh', 'Kathmandu'],
      required: true,
    },
    {
      name: 'year',
      type: 'number',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'completed' },
      ],
      required: true,
    },
    // Project Overview Section Fields
    {
      name: 'projectOverview',
      type: 'group',
      label: 'Project Overview Details',
      fields: [
        {
          name: 'overviewDescription',
          type: 'textarea',
          label: 'Project Overview Description',
          admin: {
            description: 'Brief description that appears in the project overview section',
          },
        },
        {
          name: 'speciesAtRisk',
          type: 'group',
          label: 'Species at Risk Section',
          fields: [
            {
              name: 'heading',
              type: 'text',
              label: 'Section Heading',
              defaultValue: 'SPECIES AT RISK',
              admin: {
                description: 'Customize the heading for this section',
              },
            },
            {
              name: 'species',
              type: 'array',
              label: 'Species List',
              fields: [
                {
                  name: 'species',
                  type: 'text',
                  required: true,
                  label: 'Species Name',
                },
                {
                  name: 'status',
                  type: 'select',
                  options: [
                    { label: 'Critically Endangered (CR)', value: 'CR' },
                    { label: 'Endangered (EN)', value: 'EN' },
                    { label: 'Vulnerable (VU)', value: 'VU' },
                    { label: 'Near Threatened (NT)', value: 'NT' },
                  ],
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'partners',
          type: 'group',
          label: 'Project Partners Section',
          fields: [
            {
              name: 'heading',
              type: 'text',
              label: 'Section Heading',
              defaultValue: 'PARTNER',
              admin: {
                description: 'Customize the heading for this section',
              },
            },
            {
              name: 'partnersList',
              type: 'array',
              label: 'Partners List',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  label: 'Partner Name',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Partner Description',
                },
                {
                  name: 'website',
                  type: 'text',
                  label: 'Partner Website',
                },
              ],
            },
          ],
        },
        {
          name: 'metrics',
          type: 'group',
          label: 'Project Metrics',
          fields: [
            {
              name: 'carbonStored',
              type: 'group',
              label: 'Carbon Stored Section',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Section Heading',
                  defaultValue: 'CARBON STORED',
                  admin: {
                    description: 'Customize the heading for this section',
                  },
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'Carbon Value (e.g., "34,320,000 mT")',
                },
                {
                  name: 'unit',
                  type: 'text',
                  label: 'Unit Description',
                  defaultValue: '(metric tons of CO2 equivalents)',
                },
              ],
            },
            {
              name: 'acresConserved',
              type: 'group',
              label: 'Acres Conserved Section',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Section Heading',
                  defaultValue: 'PROPOSED ACRES CONSERVED BY',
                  admin: {
                    description: 'Customize the heading for this section',
                  },
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'Acres Value (e.g., "330,000")',
                },
                {
                  name: 'method',
                  type: 'text',
                  label: 'Conservation Method',
                  defaultValue: 'Designation',
                },
              ],
            },
            {
              name: 'projectCost',
              type: 'group',
              label: 'Project Cost Section',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Section Heading',
                  defaultValue: 'PROJECT COST',
                  admin: {
                    description: 'Customize the heading for this section',
                  },
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'Project Cost (e.g., "$2,058,901")',
                },
              ],
            },
          ],
        },
        {
          name: 'locationMap',
          type: 'group',
          label: 'Location & Map',
          fields: [
            {
              name: 'coordinates',
              type: 'group',
              label: 'GPS Coordinates (Recommended)',
              fields: [
                {
                  name: 'latitude',
                  type: 'number',
                  label: 'Latitude',
                  admin: {
                    description:
                      'Enter latitude (e.g., 28.3949 for Kathmandu). This will show an interactive map with a pin.',
                  },
                },
                {
                  name: 'longitude',
                  type: 'number',
                  label: 'Longitude',
                  admin: {
                    description:
                      'Enter longitude (e.g., 84.1240 for Kathmandu). This will show an interactive map with a pin.',
                  },
                },
              ],
              admin: {
                description:
                  'Provide GPS coordinates to show an interactive Mapbox map with a location pin. This is the recommended approach for better user experience.',
              },
            },
            {
              name: 'locationDescription',
              type: 'textarea',
              label: 'Location Description',
              admin: {
                description:
                  'Describe the project location and geographical context. This will appear below the map.',
              },
            },
            {
              name: 'mapImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Static Map Image (Fallback)',
              admin: {
                description:
                  'Upload a static map image as fallback. Only used if GPS coordinates are not provided.',
              },
            },
          ],
        },
      ],
    },
  ],
}
