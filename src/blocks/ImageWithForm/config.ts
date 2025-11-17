// image-with-form.config.ts
import type { Block } from 'payload'

export const ImageWithFormBlock: Block = {
  slug: 'imageWithForm',
  labels: {
    singular: 'Image with Form',
    plural: 'Images with Form',
  },
  fields: [
    // Margin Top
    {
      name: 'marginTop',
      type: 'radio',
      label: 'Margin Top',
      required: true,
      options: [
        { label: '0px', value: 'mt-0' },
        { label: '96px', value: 'mt-[96px]' },
        { label: '150px', value: 'mt-[150px]' },
      ],
      defaultValue: 'mt-[96px]',
    },
    // Image Position
    {
      name: 'imagePosition',
      type: 'radio',
      label: 'Image Position',
      required: true,
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
    },
    // Heading
    {
      name: 'heading',
      type: 'text',
      required: false,
      label: 'Heading',
    },
    // Subheading
    {
      name: 'subheading',
      type: 'text',
      required: false,
      label: 'Subheading',
    },
    // Image
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    // Form Relationship
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms', // replace with your form collection slug
      required: true,
      hasMany: false,
      label: 'Select Form',
    },
  ],
}
