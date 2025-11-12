import type { Block } from 'payload'

export const ExploreSectionBlock: Block = {
  slug: 'exploreSection',
  labels: {
    singular: 'Explore Section',
    plural: 'Explore Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
      label: 'Section Heading',
      admin: {
        placeholder: 'e.g. Explore More, From the Blog, Latest Posts',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories', // replace with your actual categories collection slug
      required: true,
      label: 'Category',
      hasMany: false,
    },
    {
      name: 'columns',
      type: 'number',
      required: true,
      label: 'Number of Columns',
      defaultValue: 3,
      min: 1,
      max: 6,
      admin: {
        description: 'Defines how many posts are displayed per row.',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      required: false,
      label: 'Background Color',
      options: [
        { label: 'Crème', value: 'bg-creme' },
        { label: 'Background', value: 'bg-background' },
        { label: 'White', value: 'bg-white' },
        { label: 'Black', value: 'bg-black' },
        { label: 'Primary Green', value: 'bg-primary-green' },
      ],
      defaultValue: 'bg-background',
      admin: {
        description: 'Choose the background color for this section.',
      },
    },
  ],
}
